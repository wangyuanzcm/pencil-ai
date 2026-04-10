function loadModuleScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-design-ai-bundle="1"]')
    if (existing) return resolve()

    const script = document.createElement('script')
    script.type = 'module'
    script.src = src
    script.dataset.designAiBundle = '1'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load: ${src}`))
    document.body.appendChild(script)
  })
}

export async function loadBundledRenderer() {
  const src = '/restored/renderer-bundle/index.js'
  await loadModuleScript(src)
}
