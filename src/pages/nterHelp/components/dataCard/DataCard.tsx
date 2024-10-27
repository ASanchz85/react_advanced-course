import './dataCard.css'

interface DataCardProps {
  explanationData: {
    content: string
  }
}

function DataCard({ explanationData }: DataCardProps) {
  const { content } = explanationData

  return (
    <div className='data__content'>
      <p>{content}</p>
    </div>
  )
}

export default DataCard
