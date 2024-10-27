import './dataCard.css'

interface DataCardProps {
  explanationData: {
    title: string
    content: string
  }
}

function DataCard({ explanationData }: DataCardProps) {
  const { title, content } = explanationData

  return (
    <div className='data__content'>
      <h4 id={`#${title}`}>{title}</h4>
      <p>{content}</p>
    </div>
  )
}

export default DataCard
