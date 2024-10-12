import { Outlet } from 'react-router-dom'
import './layout.css'

function Layout() {
  return (
    <main className="layout__main_container">
      <Outlet />
    </main>

  )
}

export default Layout
