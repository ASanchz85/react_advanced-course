import { Header } from '../../../../theme/layout/components'
import './titleHeader.css'

interface TitleHeaderProps {
  title: string
  index: number
}

function TitleHeader({ title, index }: TitleHeaderProps) {
  return (
    <Header title={title}>
      <p>Step: {index + 1}</p>
    </Header>
  )
}

export default TitleHeader
