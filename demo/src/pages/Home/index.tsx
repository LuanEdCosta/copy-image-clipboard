import { useRef } from 'react'
import { FiCopy } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { copyImageToClipboard } from 'copy-image-clipboard'

import { FirstImage, SecondImage } from 'src/assets'

import { Container, Item, Image, CopyButton } from './styles'

const Home: React.FC = () => {
  const { t } = useTranslation('Home')

  const firstImageRef = useRef<HTMLImageElement | null>(null)
  const secondImageRef = useRef<HTMLImageElement | null>(null)

  const handleCopyFirstImage = async () => {
    const imageSrc = firstImageRef.current?.src
    if (imageSrc) await copyImageToClipboard(imageSrc)
  }

  const handleCopySecondImage = async () => {
    const imageSrc = secondImageRef.current?.src
    if (imageSrc) await copyImageToClipboard(imageSrc)
  }

  return (
    <Container>
      <Item>
        <Image src={FirstImage} ref={firstImageRef} alt="First" />

        <CopyButton onClick={handleCopyFirstImage}>
          <span>{t('copyJpgImage')}</span>
          <FiCopy />
        </CopyButton>
      </Item>

      <Item>
        <Image src={SecondImage} ref={secondImageRef} alt="Second" />

        <CopyButton onClick={handleCopySecondImage}>
          <span>{t('copyPngImage')}</span>
          <FiCopy />
        </CopyButton>
      </Item>
    </Container>
  )
}

export default Home
