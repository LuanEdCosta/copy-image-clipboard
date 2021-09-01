export function copyToClipboard(blob: Blob | null): void {
  if (blob) {
    const clipboardItem = new ClipboardItem({ [blob.type]: blob })
    navigator.clipboard.write([clipboardItem])
  }
}

function convertToPngAndCopyToClipboard(imgBlob: Blob): void {
  const imageUrl = window.URL.createObjectURL(imgBlob)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (ctx) {
    const imageEl = document.createElement('img')
    imageEl.src = imageUrl
    imageEl.crossOrigin = 'anonymous'

    imageEl.onload = (event) => {
      const target = event.target as HTMLImageElement
      const { width, height } = target
      canvas.width = width
      canvas.height = height
      ctx.drawImage(target, 0, 0, width, height)
      canvas.toBlob(copyToClipboard, 'image/png', 1)
    }
  }
}

async function copyImg(imgSrc: string): Promise<void> {
  const response = await fetch(`${imgSrc}?crossorigin`)
  const blob = await response.blob()

  if (imgSrc.endsWith('.jpg') || imgSrc.endsWith('.jpeg')) {
    convertToPngAndCopyToClipboard(blob)
  } else if (imgSrc.endsWith('.png')) {
    copyToClipboard(blob)
  }
}

export default copyImg
