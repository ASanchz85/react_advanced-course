import { ReactNode } from 'react'
import './wrappers.css'

interface AsideContentWrapperProps {
  title: string
  children: ReactNode
}

function AsideContentWrapper({ title, children }: AsideContentWrapperProps) {
  return (
    <aside className='aside__container'>
      <div className='aside__title'>
        <h2>{title}</h2>
      </div>
      <div className='aside__list'>{children}</div>
    </aside>
  )
}

export default AsideContentWrapper
