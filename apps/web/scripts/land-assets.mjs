import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const webDir = path.resolve(__dirname, '..')
const pkg = JSON.parse(await fs.readFile(path.join(webDir, 'package.json'), 'utf8'))

const project = process.env.STATIC_PROJECT ?? pkg.name
const version = process.env.STATIC_VERSION ?? pkg.version
const envName = process.env.DEPLOY_ENV ?? process.env.NODE_ENV ?? 'production'
const distDir = path.resolve(webDir, process.env.DIST_DIR ?? 'dist')

const storeRoot = path.resolve(
  process.env.STATIC_STORE_ROOT ?? path.join(webDir, '.static-store')
)

const targetDir = path.join(storeRoot, project, version, envName)
const baseUrl = process.env.STATIC_BASE_URL ?? null

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

async function walkFiles(dirPath) {
  const out = []
  const stack = [dirPath]
  while (stack.length) {
    const cur = stack.pop()
    const entries = await fs.readdir(cur, { withFileTypes: true })
    for (const entry of entries) {
      const p = path.join(cur, entry.name)
      if (entry.isDirectory()) stack.push(p)
      else if (entry.isFile()) out.push(p)
    }
  }
  return out
}

async function md5File(filePath) {
  const buf = await fs.readFile(filePath)
  return crypto.createHash('md5').update(buf).digest('hex')
}

async function copyDir(srcDir, destDir) {
  await ensureDir(destDir)
  const files = await walkFiles(srcDir)
  for (const filePath of files) {
    const rel = path.relative(srcDir, filePath)
    const dest = path.join(destDir, rel)
    await ensureDir(path.dirname(dest))
    await fs.copyFile(filePath, dest)
  }
  return files.length
}

async function generateManifest(rootDir) {
  const all = await walkFiles(rootDir)
  const files = all.filter(p => path.basename(p) !== 'manifest.json')
  const entries = []
  let totalSize = 0
  for (const filePath of files) {
    const stat = await fs.stat(filePath)
    const md5 = await md5File(filePath)
    const rel = path.relative(rootDir, filePath).replaceAll('\\', '/')
    entries.push({ path: rel, size: stat.size, md5 })
    totalSize += stat.size
  }
  return {
    project,
    version,
    env: envName,
    buildTime: new Date().toISOString(),
    fileCount: entries.length,
    totalSize,
    entries: entries.sort((a, b) => a.path.localeCompare(b.path))
  }
}

async function verifyManifest(rootDir, manifest) {
  const actual = new Map()
  const files = await walkFiles(rootDir)
  for (const f of files) {
    if (path.basename(f) === 'manifest.json') continue
    const rel = path.relative(rootDir, f).replaceAll('\\', '/')
    actual.set(rel, await md5File(f))
  }

  const mismatches = []
  for (const e of manifest.entries) {
    const md5 = actual.get(e.path)
    if (!md5) mismatches.push({ path: e.path, reason: 'missing' })
    else if (md5 !== e.md5) mismatches.push({ path: e.path, reason: 'md5', expected: e.md5, actual: md5 })
  }

  if (actual.size !== manifest.entries.length) {
    mismatches.push({ path: '*', reason: 'fileCount', expected: manifest.entries.length, actual: actual.size })
  }

  return mismatches
}

async function listVersions(projectDir) {
  try {
    const versions = await fs.readdir(projectDir, { withFileTypes: true })
    return versions.filter(e => e.isDirectory()).map(e => e.name)
  } catch {
    return []
  }
}

async function dirMtime(dirPath) {
  const stat = await fs.stat(dirPath)
  return stat.mtimeMs
}

async function pruneOldVersions({ keep = 10 }) {
  const projectDir = path.join(storeRoot, project)
  const versions = await listVersions(projectDir)
  const candidates = []
  for (const v of versions) {
    const envDir = path.join(projectDir, v, envName)
    try {
      const mtime = await dirMtime(envDir)
      candidates.push({ version: v, envDir, mtime })
    } catch {}
  }
  candidates.sort((a, b) => b.mtime - a.mtime)
  const toDelete = candidates.slice(keep)
  for (const d of toDelete) {
    await fs.rm(path.join(projectDir, d.version), { recursive: true, force: true })
  }
  return { kept: candidates.slice(0, keep).map(x => x.version), deleted: toDelete.map(x => x.version) }
}

const startedAt = Date.now()

await ensureDir(storeRoot)
await fs.rm(targetDir, { recursive: true, force: true })
await ensureDir(targetDir)

const copiedCount = await copyDir(distDir, targetDir)
const manifest = await generateManifest(targetDir)
await fs.writeFile(path.join(targetDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8')
const mismatches = await verifyManifest(targetDir, manifest)

if (mismatches.length) {
  process.stdout.write(
    JSON.stringify(
      { ok: false, reason: 'integrity', targetDir, mismatches, copiedCount },
      null,
      2
    ) + '\n'
  )
  process.exit(1)
}

const lifecycle = await pruneOldVersions({ keep: Number(process.env.STATIC_KEEP_VERSIONS ?? 10) })

const report = {
  ok: true,
  project,
  version,
  env: envName,
  copiedCount,
  fileCount: manifest.fileCount,
  totalSize: manifest.totalSize,
  elapsedMs: Date.now() - startedAt,
  storeRoot,
  targetDir,
  baseUrl,
  lifecycle
}

process.stdout.write(JSON.stringify(report, null, 2) + '\n')

