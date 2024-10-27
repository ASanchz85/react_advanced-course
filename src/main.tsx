import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './shared/context'
import mainRouting from './shared/routes/mainRouting'
import './theme/styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={mainRouting} />
    </AuthProvider>
  </StrictMode>
)
