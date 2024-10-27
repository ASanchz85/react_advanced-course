import { useEffect, useRef } from 'react'

interface LivePreviewProps {
  primaryColor: string
  secondaryColor: string
  tertiaryColor: string
  quaternaryColor: string
}

const LivePreview = ({
  primaryColor,
  secondaryColor,
  tertiaryColor,
  quaternaryColor
}: LivePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widthIframe = 1200

  const updateIframeStyles = () => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument

      if (iframeDocument) {
        iframeDocument.documentElement.style.setProperty(
          '--primary-color',
          primaryColor
        )
        iframeDocument.documentElement.style.setProperty(
          '--secondary-color',
          secondaryColor
        )
        iframeDocument.documentElement.style.setProperty(
          '--tertiary-color',
          tertiaryColor
        )
        iframeDocument.documentElement.style.setProperty(
          '--quaternary-color',
          quaternaryColor
        )
      }
    }
  }

  useEffect(() => {
    updateIframeStyles()
  }, [primaryColor, secondaryColor, tertiaryColor, quaternaryColor])

  return (
    <div
      className='preview__container'
      style={{ width: widthIframe, height: (widthIframe * 9) / 16 }}
    >
      <iframe
        ref={iframeRef}
        src='/'
        title='Live Preview'
      />
    </div>
  )
}

export default LivePreview
