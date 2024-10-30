import './dataCard.css'

interface DataCardProps {
  explanationData: {
    content: string
    image?: string[]
  }
}

function DataCard({ explanationData }: DataCardProps) {
  const { content, image } = explanationData

  return (
    <div className='data__content'>
      <p>{content}</p>
      {image &&
        image?.length > 0 &&
        image.map((img) => (
          <img
            key={img}
            src={`/${img}`}
            alt='data card'
          />
        ))}
    </div>
  )
}

export default DataCard
