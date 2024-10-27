import { ReactNode } from 'react'
import './footer.css'

interface FooterProps {
  children: ReactNode
}

function Footer({ children }: FooterProps) {
  return <footer className='footer__container'>{children}</footer>
}

export default Footer
