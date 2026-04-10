import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as acorn from 'acorn'
import * as walk from 'acorn-walk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const webDir = path.resolve(__dirname, '..')
const publicBundleDir = path.resolve(webDir, 'public', 'restored', 'renderer-bundle')
const reportDir = path.resolve(webDir, 'restored', 'reports')

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

function isIdentifier(node, name) {
  return node && node.type === 'Identifier' && node.name === name
}

function isTruthyNode(node) {
  if (!node) return false
  if (node.type === 'Literal') return node.value === true || node.value === 1
  if (node.type === 'UnaryExpression' && node.operator === '!') {
    return node.argument?.type === 'Literal' && node.argument.value === 0
  }
  return false
}

function isTruthyAssignmentToFlag(expr, flagName) {
  if (!expr || expr.type !== 'AssignmentExpression') return false
  if (expr.operator !== '=') return false
  if (!isIdentifier(expr.left, flagName)) return false
  return isTruthyNode(expr.right)
}

function detectCjsGetter(fnNode) {
  const body = fnNode.body?.body
  if (!Array.isArray(body) || body.length < 1) return null

  if (body.length === 1 && body[0].type === 'ReturnStatement') {
    const ret = body[0].argument
    if (ret?.type === 'LogicalExpression' && ret.operator === '||' && ret.left?.type === 'Identifier') {
      const flagName = ret.left.name
      const right = ret.right
      if (right?.type === 'SequenceExpression' && right.expressions.length >= 2) {
        const expressions = right.expressions
        const hasFlagAssign = expressions.some(e => isTruthyAssignmentToFlag(e, flagName))
        const last = expressions[expressions.length - 1]
        if (hasFlagAssign && last.type === 'Identifier') {
          return { flagName, exportVar: last.name }
        }
      }
    }
  }

  const firstIf = body[0]
  if (firstIf.type !== 'IfStatement') return null

  const test = firstIf.test
  if (!test || test.type !== 'Identifier') return null
  const flagName = test.name

  const cons = firstIf.consequent
  if (!cons || cons.type !== 'ReturnStatement') return null

  const retArg = cons.argument
  if (!retArg || retArg.type !== 'Identifier') return null
  const exportVar = retArg.name

  const second = body[1]
  if (second.type !== 'ExpressionStatement') return null
  const expr = second.expression
  if (!expr || expr.type !== 'AssignmentExpression') return null
  if (!isTruthyAssignmentToFlag(expr, flagName)) return null

  const last = body[body.length - 1]
  if (last.type !== 'ReturnStatement') return null
  const lastArg = last.argument
  if (!lastArg || lastArg.type !== 'Identifier') return null
  if (lastArg.name !== exportVar) return null

  return { flagName, exportVar }
}

function isModuleObjectDeclarator(decl) {
  if (!decl || decl.type !== 'VariableDeclarator') return false
  if (decl.id?.type !== 'Identifier') return false
  const init = decl.init
  if (!init || init.type !== 'ObjectExpression') return false
  for (const prop of init.properties) {
    if (prop.type !== 'Property') continue
    const key = prop.key
    const keyName = key.type === 'Identifier' ? key.name : key.type === 'Literal' ? key.value : null
    if (keyName !== 'exports') continue
    const val = prop.value
    if (val.type === 'ObjectExpression') return true
  }
  return false
}

await ensureDir(reportDir)

const indexPath = path.join(publicBundleDir, 'index.js')
const code = await fs.readFile(indexPath, 'utf8')

const ast = acorn.parse(code, {
  ecmaVersion: 'latest',
  sourceType: 'module',
  allowHashBang: true
})

const modules = []
const moduleObjects = []

walk.simple(ast, {
  FunctionDeclaration(node) {
    if (!node.id || node.id.type !== 'Identifier') return
    const detected = detectCjsGetter(node)
    if (!detected) return
    modules.push({
      name: node.id.name,
      flag: detected.flagName,
      exportVar: detected.exportVar,
      start: node.start,
      end: node.end
    })
  }
})

walk.simple(ast, {
  VariableDeclaration(node) {
    for (const decl of node.declarations) {
      if (!isModuleObjectDeclarator(decl)) continue
      moduleObjects.push({
        name: decl.id.name,
        start: decl.start,
        end: decl.end
      })
    }
  }
})

const moduleNames = new Set(modules.map(m => m.name))
const edges = []

walk.simple(ast, {
  CallExpression(node) {
    if (node.callee?.type !== 'Identifier') return
    const callee = node.callee.name
    if (!moduleNames.has(callee)) return

    let owner = null
    for (const m of modules) {
      if (node.start >= m.start && node.end <= m.end) {
        owner = m.name
        break
      }
    }
    if (!owner || owner === callee) return
    edges.push({ from: owner, to: callee })
  }
})

const uniqueEdges = new Map()
for (const e of edges) uniqueEdges.set(`${e.from}->${e.to}`, e)

const incoming = new Map()
const outgoing = new Map()
for (const e of uniqueEdges.values()) {
  outgoing.set(e.from, (outgoing.get(e.from) ?? 0) + 1)
  incoming.set(e.to, (incoming.get(e.to) ?? 0) + 1)
}

const ranked = modules
  .map(m => ({
    ...m,
    in: incoming.get(m.name) ?? 0,
    out: outgoing.get(m.name) ?? 0
  }))
  .sort((a, b) => b.in - a.in || b.out - a.out || a.name.localeCompare(b.name))

const report = {
  generatedAt: new Date().toISOString(),
  input: indexPath,
  sizeBytes: Buffer.byteLength(code, 'utf8'),
  detectedModules: ranked.length,
  detectedModuleObjects: moduleObjects.length,
  edges: Array.from(uniqueEdges.values()),
  topByIncoming: ranked.slice(0, 50),
  modules: ranked,
  moduleObjects: moduleObjects.slice(0, 500)
}

const outPath = path.join(reportDir, 'unbundle-scan.json')
await fs.writeFile(outPath, JSON.stringify(report, null, 2) + '\n', 'utf8')
process.stdout.write(JSON.stringify({ ok: true, outPath, detectedModules: ranked.length, edges: report.edges.length }, null, 2) + '\n')
