import { AsideContentWrapper } from '../../../../theme/layout/components'
import { findTitleViewByPath } from '../../../../shared/utils/pathHandler'
import './guideLinks.css'

function GuideLinks() {
  const title = findTitleViewByPath()

  return (
    <AsideContentWrapper title={title}>
      <p>just text</p>
    </AsideContentWrapper>
  )
}

export default GuideLinks
