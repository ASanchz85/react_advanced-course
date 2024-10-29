import { useEffect, useRef } from 'react'
import { COLOR_CSS_VAR_NAMES } from '../../../shared/config/constants'
import useResponsiveWidth from '../../../shared/hooks/useResponsiveWidth'

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
  const windowWidth = useResponsiveWidth()
  const widthIframe = windowWidth * 0.8

  const updateIframeStyles = () => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument

      if (iframeDocument) {
        iframeDocument.documentElement.style.setProperty(
          COLOR_CSS_VAR_NAMES.PRIMARY,
          primaryColor
        )
        iframeDocument.documentElement.style.setProperty(
          COLOR_CSS_VAR_NAMES.SECONDARY,
          secondaryColor
        )
        iframeDocument.documentElement.style.setProperty(
          COLOR_CSS_VAR_NAMES.TERTIARY,
          tertiaryColor
        )
        iframeDocument.documentElement.style.setProperty(
          COLOR_CSS_VAR_NAMES.QUATERNARY,
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
