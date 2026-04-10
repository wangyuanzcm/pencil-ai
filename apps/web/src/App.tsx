import { useEffect, useState } from 'react'

function App() {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        await import('./restored/unbundled-safe/index.js')
        setLoaded(true)
      } catch (e: any) {
        setError(e?.message ?? String(e))
      }
    })()
  }, [])

  return (
    <div style={{ padding: 16 }}>
      <h1>Design AI Web（还原运行壳）</h1>
      <p>此页面作为还原调试壳，开发模式下直接加载桌面端 renderer 的打包资源。</p>
      {!loaded && !error && <p>正在加载原始资源...</p>}
      {loaded && <p>原始资源已注入（如有 UI/Canvas 将由其自行挂载）。</p>}
      {error && (
        <p style={{ color: 'red' }}>加载失败：{error}</p>
      )}
    </div>
  )
}

export default App
