import { Header } from '../../../../theme/layout/components'
import { IoChevronForward } from 'react-icons/io5'
import './titleHeader.css'

interface TitleHeaderProps {
  title: string
  index: number
  onStepPosition: (index: number) => void
}

function TitleHeader({ title, index, onStepPosition }: TitleHeaderProps) {
  return (
    <Header title={title}>
      <div className='icons__container'>
        <span className='icons_item'>
          <IoChevronForward
            className='icon-backwards'
            onClick={() => onStepPosition(-1)}
          />
        </span>
        <p>Step: {index + 1}</p>
        <span className='icons_item'>
          <IoChevronForward
            className='icon-forwards'
            onClick={() => onStepPosition(1)}
          />
        </span>
      </div>
    </Header>
  )
}

export default TitleHeader
