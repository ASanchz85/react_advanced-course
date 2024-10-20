import { Outlet } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import './layout.css'
import Footer from './components/footer/Footer'

function Layout() {
  return (
    <main className='layout__main_container'>
      <section className='sidebar__container'>
        <Sidebar />
      </section>
      <Outlet />
      {/* <Footer /> */}
    </main>
  )
}

export default Layout
