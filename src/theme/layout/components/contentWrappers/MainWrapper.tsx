import { ReactNode } from 'react'
import './wrappers.css'

interface MainWrapperProps {
  asideContent: ReactNode
  headerDetails: ReactNode
  mainContent: ReactNode
}

function MainWrapper({
  asideContent,
  headerDetails,
  mainContent
}: MainWrapperProps) {
  return (
    <section className='main__container'>
      <div className='main__content__wrapper'>
        {asideContent}
        <div className='main__data__view__container'>
          {headerDetails}
          {mainContent}
        </div>
      </div>
    </section>
  )
}

export default MainWrapper
