import { ReactNode } from 'react'
import './wrappers.css'

interface ContentWrapperProps {
  children: ReactNode
}

function ContentWrapper({ children }: ContentWrapperProps) {
  return <div className='content__wrapper'>{children}</div>
}

export default ContentWrapper
