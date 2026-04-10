import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import { buildDesktopAssetsInventory } from './inventory.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const webDir = path.resolve(__dirname, '..')
const repoRoot = path.resolve(webDir, '..', '..')
const desktopAssetsDir = path.resolve(repoRoot, 'apps', 'desktop', 'src', 'renderer', 'assets')
const restoreDir = path.resolve(webDir, '.restore')

function nowId() {
  return new Date().toISOString().replace(/[:.]/g, '-')
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8')
}

async function copyIfExists(src, dest) {
  try {
    await fs.copyFile(src, dest)
    return true
  } catch {
    return false
  }
}

async function restoreFromBackup(backupDir) {
  await fs.copyFile(path.join(backupDir, 'apps-web-package.json'), path.join(webDir, 'package.json'))
  const lockSrc = path.join(backupDir, 'pnpm-lock.yaml')
  const lockDest = path.join(repoRoot, 'pnpm-lock.yaml')
  try {
    await fs.copyFile(lockSrc, lockDest)
  } catch {}
}

function run(cmd, args, { cwd, logStream }) {
  return new Promise(resolve => {
    const child = spawn(cmd, args, { cwd, shell: true, env: process.env })
    child.stdout.on('data', d => logStream.write(d))
    child.stderr.on('data', d => logStream.write(d))
    child.on('close', code => resolve(code ?? 1))
  })
}

function pickVersion(inventory, name) {
  return inventory.thirdParty.find(x => x.name === name)?.version ?? null
}

function computePackagePlan(inventory, pkg) {
  const desired = {}

  const react = pickVersion(inventory, 'react')
  if (react) {
    desired.react = react
    desired['react-dom'] = react
  }

  const router = pickVersion(inventory, 'react-router')
  if (router) desired['react-router-dom'] = router

  const pixi = pickVersion(inventory, 'pixi')
  if (pixi) desired['pixi.js'] = pixi

  const changes = []
  const next = structuredClone(pkg)
  next.dependencies = next.dependencies ?? {}

  for (const [dep, ver] of Object.entries(desired)) {
    const prev = next.dependencies[dep]
    if (prev !== ver) {
      next.dependencies[dep] = ver
      changes.push({ dep, from: prev ?? null, to: ver })
    }
  }

  return { desired, changes, next }
}

const startedAt = Date.now()
const runId = nowId()

await ensureDir(restoreDir)
await ensureDir(path.join(restoreDir, 'logs'))
await ensureDir(path.join(restoreDir, 'reports'))
await ensureDir(path.join(restoreDir, 'backups', runId))

const logPath = path.join(restoreDir, 'logs', `restore-${runId}.log`)
const reportPath = path.join(restoreDir, 'reports', `restore-${runId}.json`)
const backupDir = path.join(restoreDir, 'backups', runId)

const logStream = (await fs.open(logPath, 'a')).createWriteStream()

const report = {
  ok: false,
  runId,
  startedAt: new Date().toISOString(),
  endedAt: null,
  elapsedMs: null,
  inventory: null,
  packagePlan: null,
  steps: [],
  rollback: null
}

try {
  report.steps.push({ name: 'inventory', ok: false })
  const inventory = await buildDesktopAssetsInventory(desktopAssetsDir)
  report.inventory = inventory
  await writeJson(path.join(restoreDir, 'reports', `inventory-${runId}.json`), inventory)
  report.steps[report.steps.length - 1].ok = true

  report.steps.push({ name: 'backup', ok: false })
  await fs.copyFile(path.join(webDir, 'package.json'), path.join(backupDir, 'apps-web-package.json'))
  await copyIfExists(path.join(repoRoot, 'pnpm-lock.yaml'), path.join(backupDir, 'pnpm-lock.yaml'))
  report.steps[report.steps.length - 1].ok = true

  report.steps.push({ name: 'align-deps', ok: false })
  const pkg = JSON.parse(await fs.readFile(path.join(webDir, 'package.json'), 'utf8'))
  const plan = computePackagePlan(inventory, pkg)
  report.packagePlan = { desired: plan.desired, changes: plan.changes }
  if (plan.changes.length) await writeJson(path.join(webDir, 'package.json'), plan.next)
  report.steps[report.steps.length - 1].ok = true

  report.steps.push({ name: 'pnpm-install', ok: false })
  const installCode = await run(
    'pnpm',
    ['--filter', 'design-ai-web', 'install'],
    { cwd: repoRoot, logStream }
  )
  if (installCode !== 0) throw new Error(`pnpm install failed with code ${installCode}`)
  report.steps[report.steps.length - 1].ok = true

  report.steps.push({ name: 'typecheck', ok: false })
  const typecheckCode = await run(
    'pnpm',
    ['--filter', 'design-ai-web', 'typecheck'],
    { cwd: repoRoot, logStream }
  )
  if (typecheckCode !== 0) throw new Error(`typecheck failed with code ${typecheckCode}`)
  report.steps[report.steps.length - 1].ok = true

  report.steps.push({ name: 'tests', ok: false })
  const testCode = await run('pnpm', ['--filter', 'design-ai-web', 'test'], { cwd: repoRoot, logStream })
  if (testCode !== 0) throw new Error(`tests failed with code ${testCode}`)
  report.steps[report.steps.length - 1].ok = true

  report.steps.push({ name: 'sync-desktop-assets', ok: false })
  const syncCode = await run(
    'pnpm',
    ['--filter', 'design-ai-web', 'sync:desktop-assets'],
    { cwd: repoRoot, logStream }
  )
  if (syncCode !== 0) throw new Error(`sync desktop assets failed with code ${syncCode}`)
  report.steps[report.steps.length - 1].ok = true

  report.steps.push({ name: 'decompile-assets', ok: false })
  const decompileCode = await run(
    'pnpm',
    ['--filter', 'design-ai-web', 'decompile:assets'],
    { cwd: repoRoot, logStream }
  )
  if (decompileCode !== 0) throw new Error(`decompile assets failed with code ${decompileCode}`)
  report.steps[report.steps.length - 1].ok = true

  report.steps.push({ name: 'unbundle-plan', ok: false })
  const planCode = await run(
    'pnpm',
    ['--filter', 'design-ai-web', 'unbundle:plan'],
    { cwd: repoRoot, logStream }
  )
  if (planCode !== 0) throw new Error(`unbundle plan failed with code ${planCode}`)
  report.steps[report.steps.length - 1].ok = true

  report.steps.push({ name: 'unbundle-exports', ok: false })
  const exportsCode = await run(
    'pnpm',
    ['--filter', 'design-ai-web', 'unbundle:exports'],
    { cwd: repoRoot, logStream }
  )
  if (exportsCode !== 0) throw new Error(`unbundle exports failed with code ${exportsCode}`)
  report.steps[report.steps.length - 1].ok = true

  report.steps.push({ name: 'unbundle-scan', ok: false })
  const scanCode = await run(
    'pnpm',
    ['--filter', 'design-ai-web', 'unbundle:scan'],
    { cwd: repoRoot, logStream }
  )
  if (scanCode !== 0) throw new Error(`unbundle scan failed with code ${scanCode}`)
  report.steps[report.steps.length - 1].ok = true

  report.steps.push({ name: 'unbundle-build-src', ok: false })
  const buildSrcCode = await run(
    'pnpm',
    ['--filter', 'design-ai-web', 'unbundle:build-src'],
    { cwd: repoRoot, logStream }
  )
  if (buildSrcCode !== 0) throw new Error(`unbundle build-src failed with code ${buildSrcCode}`)
  report.steps[report.steps.length - 1].ok = true

  report.steps.push({ name: 'integration', ok: false })
  const integrationCode = await run(
    'pnpm',
    ['--filter', 'design-ai-web', 'test:integration'],
    { cwd: repoRoot, logStream }
  )
  if (integrationCode !== 0) throw new Error(`integration checks failed with code ${integrationCode}`)
  report.steps[report.steps.length - 1].ok = true

  report.steps.push({ name: 'build', ok: false })
  const buildCode = await run('pnpm', ['--filter', 'design-ai-web', 'build'], { cwd: repoRoot, logStream })
  if (buildCode !== 0) throw new Error(`build failed with code ${buildCode}`)
  report.steps[report.steps.length - 1].ok = true

  report.steps.push({ name: 'perf', ok: false })
  const perfCode = await run(
    'pnpm',
    ['--filter', 'design-ai-web', 'exec', 'node', 'scripts/perf-check.mjs'],
    { cwd: repoRoot, logStream }
  )
  if (perfCode !== 0) throw new Error(`perf check failed with code ${perfCode}`)
  report.steps[report.steps.length - 1].ok = true

  report.ok = true
} catch (e) {
  report.rollback = { attempted: true, ok: false, backupDir }
  try {
    await restoreFromBackup(backupDir)
    const reinstallCode = await run(
      'pnpm',
      ['--filter', 'design-ai-web', 'install'],
      { cwd: repoRoot, logStream }
    )
    report.rollback.ok = reinstallCode === 0
  } catch {
    report.rollback.ok = false
  }
  logStream.write(`\nERROR: ${e?.stack ?? String(e)}\n`)
} finally {
  report.endedAt = new Date().toISOString()
  report.elapsedMs = Date.now() - startedAt
  await writeJson(reportPath, report)
  logStream.end()
}

process.stdout.write(JSON.stringify({ ok: report.ok, reportPath }, null, 2) + '\n')
process.exitCode = report.ok ? 0 : 1
