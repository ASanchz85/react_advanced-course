import { Outlet } from 'react-router-dom'
import { Sidebar } from './components'
import './layout.css'

function Layout() {
  return (
    <main className='layout__main_container'>
      <aside className='sidebar__container'>
        <Sidebar />
      </aside>
      <Outlet />
    </main>
  )
}

export default Layout
