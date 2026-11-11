import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const isLocalAdmin = import.meta.env.DEV && import.meta.env.MODE === 'admin'
const AdminDashboard = isLocalAdmin
  ? lazy(() =>
      import('./components/AdminDashboard.tsx').then((m) => ({
        default: m.AdminDashboard,
      })),
    )
  : null

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {AdminDashboard ? (
      <Suspense fallback={null}>
        <AdminDashboard />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
