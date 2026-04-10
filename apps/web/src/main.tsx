import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'

function ensureBaseStyles() {
  const href = '/restored/renderer-bundle/index.css'

  const existing = document.querySelector<HTMLLinkElement>('link[data-design-ai-base-style="1"]')
  if (existing) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.dataset.designAiBaseStyle = '1'
  document.head.appendChild(link)
}

ensureBaseStyles()

const router = createBrowserRouter([
  { path: '/', element: <App /> }
])

const root = document.getElementById('root')!
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
