import { ReactNode } from 'react'
import './contentWrappers.css'

interface ContentAreaWrapperProps {
  asideContent: ReactNode
  headerDetails: ReactNode
  mainContent: ReactNode
}

function ContentAreaWrapper({
  asideContent,
  headerDetails,
  mainContent
}: ContentAreaWrapperProps) {
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

export default ContentAreaWrapper
