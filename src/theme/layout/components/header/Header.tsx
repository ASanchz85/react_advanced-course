import { ReactNode } from 'react'
import './header.css'

interface HeaderProps {
  title?: string
  children: ReactNode
}

function Header({ title, children }: HeaderProps) {
  return (
    <header className='header__content'>
      {title && <h2>{title}</h2>}
      {children}
    </header>
  )
}

export default Header
