import { useEffect, useRef, useState } from 'react'
import { FiCopy } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { copyImageToClipboard } from 'copy-image-clipboard'

import { WhiteSpinner } from 'src/components'
import { FirstImage, SecondImage } from 'src/assets'

import {
  Container,
  Content,
  Item,
  Image,
  CopyButton,
  Paste,
  PasteText,
  PasteImage,
} from './styles'

const Home: React.FC = () => {
  const { t } = useTranslation('Home')

  const [copiedImageURL, setCopiedImageURL] = useState('')
  const [isCopyingFirstImage, setIsCopyingFirstImage] = useState(false)
  const [isCopyingSecondImage, setIsCopyingSecondImage] = useState(false)

  const firstImageRef = useRef<HTMLImageElement | null>(null)
  const secondImageRef = useRef<HTMLImageElement | null>(null)

  const handleCopyFirstImage = async () => {
    try {
      setIsCopyingFirstImage(true)
      const imageSrc = firstImageRef.current?.src
      if (imageSrc) await copyImageToClipboard(imageSrc)
    } catch (e: any) {
      if (e?.message) alert(e.message)
    } finally {
      setIsCopyingFirstImage(false)
    }
  }

  const handleCopySecondImage = async () => {
    try {
      setIsCopyingSecondImage(true)
      const imageSrc = secondImageRef.current?.src
      if (imageSrc) await copyImageToClipboard(imageSrc)
    } catch (e: any) {
      if (e?.message) alert(e.message)
    } finally {
      setIsCopyingSecondImage(false)
    }
  }

  const handleTransformDataTransferIntoURL = (
    dataTransfer: DataTransfer,
  ): string => {
    const [firstItem] = dataTransfer.items
    const blob = firstItem.getAsFile()
    return URL.createObjectURL(blob)
  }

  const handlePaste = (e: unknown) => {
    const event = e as ClipboardEvent
    if (event.clipboardData) {
      const url = handleTransformDataTransferIntoURL(event.clipboardData)
      setCopiedImageURL(url)
    }
  }

  useEffect(() => {
    const handlePasteOnDocument = (e: ClipboardEvent) => {
      if (e.clipboardData) {
        const url = handleTransformDataTransferIntoURL(e.clipboardData)
        setCopiedImageURL(url)
      }
    }

    document.addEventListener('paste', handlePasteOnDocument)

    return () => {
      document.removeEventListener('paste', handlePasteOnDocument)
    }
  })

  return (
    <Container>
      <Content>
        <Item>
          <Image
            ref={firstImageRef}
            src={FirstImage}
            draggable={false}
            alt={t('firstImageAlt')}
          />

          <CopyButton onClick={handleCopyFirstImage}>
            <span>{t('copyJpgImage')}</span>
            {isCopyingFirstImage ? <WhiteSpinner /> : <FiCopy />}
          </CopyButton>
        </Item>

        <Item>
          <Image
            ref={secondImageRef}
            src={SecondImage}
            draggable={false}
            alt={t('secondImageAlt')}
          />

          <CopyButton onClick={handleCopySecondImage}>
            <span>{t('copyPngImage')}</span>
            {isCopyingSecondImage ? <WhiteSpinner /> : <FiCopy />}
          </CopyButton>
        </Item>
      </Content>

      <Paste onPaste={handlePaste}>
        {copiedImageURL ? (
          <PasteImage src={copiedImageURL} alt={t('pasteImageAlt')} />
        ) : (
          <PasteText>{t('pasteText')}</PasteText>
        )}
      </Paste>
    </Container>
  )
}

export default Home
