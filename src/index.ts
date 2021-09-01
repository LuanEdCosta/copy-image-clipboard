export function copyToClipboard(blob: Blob | null): void {
  if (blob) {
    const clipboardItem = new ClipboardItem({ [blob.type]: blob })
    navigator.clipboard.write([clipboardItem])
  }
}

export function convertToPngAndCopyToClipboard(imageBlob: Blob): void {
  const imageUrl = window.URL.createObjectURL(imageBlob)
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (context) {
    const imageElement = document.createElement('img')
    imageElement.src = imageUrl
    imageElement.crossOrigin = 'anonymous'

    imageElement.onload = (event) => {
      const target = event.target as HTMLImageElement
      const { width, height } = target
      canvas.width = width
      canvas.height = height
      context.drawImage(target, 0, 0, width, height)
      canvas.toBlob(copyToClipboard, 'image/png', 1)
    }
  }
}

export async function copyImg(imageSource: string): Promise<void> {
  const response = await fetch(`${imageSource}?crossorigin`)
  const blob = await response.blob()

  if (imageSource.endsWith('.jpg') || imageSource.endsWith('.jpeg')) {
    convertToPngAndCopyToClipboard(blob)
  } else if (imageSource.endsWith('.png')) {
    copyToClipboard(blob)
  }
}

export default copyImg
