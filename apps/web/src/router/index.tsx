import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'

// TODO: 从反编译结果恢复真实路由配置
export const router = createBrowserRouter([
  { path: '/', element: <App /> }
])

