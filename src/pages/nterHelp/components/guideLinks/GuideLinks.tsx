import { AsideContentWrapper } from '../../../../theme/layout/components'
import { findTitleViewByPath } from '../../../../shared/utils/pathHandler'
import './guideLinks.css'

interface GuideLinksProps {
  dataList: string[]
  currentIndex: number
  onStepClick: (index: number) => void
}

function GuideLinks({ dataList, currentIndex, onStepClick }: GuideLinksProps) {
  const title = findTitleViewByPath()

  return (
    <AsideContentWrapper title={title}>
      {dataList.map((stepTitle, stepIndex) => (
        <div
          className={`list-item ${currentIndex === stepIndex ? 'active' : ''}`}
          key={stepIndex}
          onClick={() => onStepClick(stepIndex)}
        >
          <p>{stepTitle.split(':')[0]}:</p>
          <p>{stepTitle.split(':')[1]}</p>
        </div>
      ))}
    </AsideContentWrapper>
  )
}

export default GuideLinks
