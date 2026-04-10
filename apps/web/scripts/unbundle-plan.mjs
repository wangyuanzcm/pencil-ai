import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildDesktopAssetsInventory } from './inventory.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const webDir = path.resolve(__dirname, '..')
const repoRoot = path.resolve(webDir, '..', '..')
const desktopAssetsDir = path.resolve(repoRoot, 'apps', 'desktop', 'src', 'renderer', 'assets')
const publicBundleDir = path.resolve(webDir, 'public', 'restored', 'renderer-bundle')
const reportDir = path.resolve(webDir, 'restored', 'reports')

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

function extractLastExportSnippet(text) {
  const candidates = ['export{', 'export {', '\nexport{', '\nexport {']
  let idx = -1
  for (const c of candidates) idx = Math.max(idx, text.lastIndexOf(c))
  if (idx === -1) {
    const last = text.lastIndexOf('export')
    if (last === -1) return { found: false, snippet: null }
    return { found: false, snippet: text.slice(Math.max(0, last - 200), Math.min(text.length, last + 2000)) }
  }
  return { found: true, snippet: text.slice(idx, Math.min(text.length, idx + 4000)) }
}

function parseExportPairsFromSnippet(snippet) {
  if (!snippet) return []
  const start = snippet.indexOf('export')
  if (start === -1) return []
  const braceStart = snippet.indexOf('{', start)
  const braceEnd = snippet.indexOf('}', braceStart + 1)
  if (braceStart === -1 || braceEnd === -1) return []

  const body = snippet.slice(braceStart + 1, braceEnd).trim()
  if (!body) return []

  return body
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .map(entry => {
      const m = entry.match(/^(.+?)\s+as\s+(.+)$/)
      if (m) return { local: m[1].trim(), exported: m[2].trim() }
      return { local: entry, exported: entry }
    })
}

function classifyFileBlock(fileName) {
  if (fileName === 'index.js') return 'renderer-bundle/entry'
  if (fileName.startsWith('browserAll')) return 'renderer-bundle/pixi-plugins/browser'
  if (fileName.startsWith('webworkerAll')) return 'renderer-bundle/pixi-plugins/worker'
  if (fileName.endsWith('.css')) return 'static/style'
  if (fileName.endsWith('.wasm')) return 'static/wasm'
  return 'static/other'
}

function findAnchors(text) {
  const anchors = [
    { name: 'vite-map-deps', re: /__vite__mapDeps/ },
    { name: 'react-license', re: /@license React/i },
    { name: 'react-router', re: /react-router v\d+\.\d+\.\d+/i },
    { name: 'lodash-license', re: /\* Lodash <https:\/\/lodash\.com\/>/i },
    { name: 'sentry-version', re: /Lx="(\d+\.\d+\.\d+)"/ },
    { name: 'pixi-version', re: /G\("v(\d+\.\d+\.\d+)"/ }
  ]
  const found = []
  for (const a of anchors) {
    const m = text.match(a.re)
    if (!m) continue
    found.push({ name: a.name, match: m[0], index: text.indexOf(m[0]) })
  }
  found.sort((x, y) => x.index - y.index)
  return found
}

await ensureDir(reportDir)

const inventory = await buildDesktopAssetsInventory(desktopAssetsDir)

const indexFromPublic = await fs.readFile(path.join(publicBundleDir, 'index.js'), 'utf8')
const exportSnippet = extractLastExportSnippet(indexFromPublic)
const exportPairs = parseExportPairsFromSnippet(exportSnippet.snippet)
const anchors = findAnchors(indexFromPublic)

const sourceFiles = (await fs.readdir(desktopAssetsDir, { withFileTypes: true }))
  .filter(e => e.isFile())
  .map(e => e.name)
  .sort((a, b) => a.localeCompare(b))

const mapping = sourceFiles.map(f => ({
  file: f,
  from: path.join(desktopAssetsDir, f),
  to: path.join(publicBundleDir, f),
  block: classifyFileBlock(f)
}))

const plan = {
  generatedAt: new Date().toISOString(),
  input: {
    desktopAssetsDir,
    publicBundleDir
  },
  inventory: {
    missing: inventory.missing,
    thirdParty: inventory.thirdParty,
    bundles: inventory.bundles
  },
  current: {
    files: mapping,
    indexJs: {
      sizeBytes: Buffer.byteLength(indexFromPublic, 'utf8'),
      anchors,
      exportSnippet: {
        found: exportSnippet.found,
        snippet: exportSnippet.snippet
      },
      exports: exportPairs
    }
  },
  targetUnbundle: {
    goal: '将 index.js 中的业务逻辑与第三方库解耦，重建 src 模块与显式 import/export，最终不再依赖 public/restored/renderer-bundle/index.js',
    constraints: [
      '无 source map：无法 100% 还原原始文件边界与命名，只能基于 bundle 模式识别与行为回归验证',
      'index.js 内混合了 vendor 与业务代码：需要先识别模块初始化包装函数与导出表',
      '必须保持离线：CSS 中外链必须移除或改为本地字体/资源'
    ],
    phases: [
      {
        name: 'phase-1: 建模',
        steps: [
          '从 index.js 末尾 export 列表构建符号表（exported -> local）',
          '扫描 bundle 中的模块初始化包装（常见形态：flag + exportsObj + function getter）并建立调用图',
          '将调用图聚类为 vendor/react、vendor/router、vendor/pixi、vendor/sentry、vendor/utils 与 app'
        ]
      },
      {
        name: 'phase-2: 抽离 vendor',
        steps: [
          '用 npm 依赖替换内联库（react/react-dom/react-router-dom/pixi.js/@sentry/*/lodash*）',
          '将 app 代码中对内联库的引用重写为标准 ESM import',
          '保留必要 polyfill 与兼容层（如 modulepreload）'
        ]
      },
      {
        name: 'phase-3: 还原 app',
        steps: [
          '把 app 逻辑按路由/状态/工具/渲染管线分层到 src 目录',
          '为无法还原的边界添加 TODO（但保持行为一致）'
        ]
      },
      {
        name: 'phase-4: 验证',
        steps: [
          '跑单测/集成校验/构建/性能门禁',
          '用 DOM 断言或渲染输出 hash 做行为回归比对'
        ]
      }
    ]
  }
}

const outPath = path.join(reportDir, 'unbundle-plan.json')
await fs.writeFile(outPath, JSON.stringify(plan, null, 2) + '\n', 'utf8')
process.stdout.write(JSON.stringify({ ok: true, outPath }, null, 2) + '\n')

