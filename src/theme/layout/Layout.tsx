import { Outlet } from 'react-router-dom'
import './layout.css'
import Sidebar from './components/sidebar/Sidebar'

function Layout() {
  return (
    <main className="layout__main_container">
      <section className="sidebar__container">
        <Sidebar />
      </section>
      <Outlet />
    </main>

  )
}

export default Layout
