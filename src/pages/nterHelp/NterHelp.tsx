import { useState } from 'react'
import {
  ContentWrapper,
  Footer,
  MainWrapper
} from '../../theme/layout/components'
import { DataCard, GuideLinks, TitleHeader } from './components'
import howTo from './data/howTo.json'
import './nterHelp.css'

function NterHelp() {
  const [stepIndex, setStepIndex] = useState(0)

  const handleStepPosition = (moveIndex: number) => {
    if (stepIndex + moveIndex < 0 || stepIndex + moveIndex >= howTo.length) {
      return
    }

    setStepIndex((prev) => prev + moveIndex)
  }

  const handleStepClick = (index: number) => {
    setStepIndex(index)
  }

  return (
    <MainWrapper
      asideContent={
        <GuideLinks
          dataList={howTo.map((step) => step.title)}
          currentIndex={stepIndex}
          onStepClick={handleStepClick}
        />
      }
      headerDetails={
        <TitleHeader
          title={howTo[stepIndex].title.split(':')[1]}
          index={stepIndex}
          onStepPosition={handleStepPosition}
        />
      }
      mainContent={
        <>
          <ContentWrapper>
            <DataCard explanationData={howTo[stepIndex]} />
          </ContentWrapper>
          <Footer>
            <div className='footer__advice_container'>
              <p className='footer__advice_text'>
                If you have some doubts while setting this part up, drop a line
                to <b>antonio.sanchez@nter.es</b>
              </p>
            </div>
          </Footer>
        </>
      }
    />
  )
}

export default NterHelp
