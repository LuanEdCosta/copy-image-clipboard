export async function getBlobFromImageSource(
  imageSource: string,
): Promise<Blob> {
  const response = await fetch(`${imageSource}`)
  return await response.blob()
}

export function isJpegBlob(blob: Blob): boolean {
  return blob.type.includes('jpeg')
}

export function isPngBlob(blob: Blob): boolean {
  return blob.type.includes('png')
}

export async function createImageElement(
  imageSource: string,
): Promise<HTMLImageElement> {
  return new Promise(function (resolve, reject) {
    const imageElement = document.createElement('img')
    imageElement.crossOrigin = 'anonymous'
    imageElement.src = imageSource

    imageElement.onload = function (event) {
      const target = event.target as HTMLImageElement
      resolve(target)
    }

    imageElement.onabort = reject
    imageElement.onerror = reject
  })
}

export async function getBlobFromImageElement(
  imageElement: HTMLImageElement,
): Promise<Blob> {
  return new Promise(function (resolve, reject) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (context) {
      const { width, height } = imageElement
      canvas.width = width
      canvas.height = height
      context.drawImage(imageElement, 0, 0, width, height)

      canvas.toBlob(
        function (blob) {
          if (blob) resolve(blob)
          else reject('Cannot get blob from image element')
        },
        'image/png',
        1,
      )
    }
  })
}

export async function convertBlobToPng(imageBlob: Blob): Promise<Blob> {
  const imageSource = URL.createObjectURL(imageBlob)
  const imageElement = await createImageElement(imageSource)
  return await getBlobFromImageElement(imageElement)
}

export async function copyBlobToClipboard(blob: Blob): Promise<void> {
  const items = { [blob.type]: blob } as unknown as Record<
    string,
    ClipboardItemData
  >

  const clipboardItem = new ClipboardItem(items)
  await navigator.clipboard.write([clipboardItem])
}

export async function copyImageToClipboard(imageSource: string): Promise<void> {
  const blob = await getBlobFromImageSource(imageSource)

  if (isJpegBlob(blob)) {
    const pngBlob = await convertBlobToPng(blob)
    copyBlobToClipboard(pngBlob)
    return
  } else if (isPngBlob(blob)) {
    copyBlobToClipboard(blob)
    return
  }

  throw new Error('Cannot copy this type of image to clipboard')
}

export async function requestClipboardWritePermission(): Promise<boolean> {
  if (!navigator?.permissions?.query) return false

  const { state } = await navigator.permissions.query({
    name: 'clipboard-write' as PermissionName,
  })

  return state === 'granted'
}

export function canCopyImagesToClipboard(): boolean {
  const hasFetch = typeof fetch !== 'undefined'
  const hasClipboardItem = typeof ClipboardItem !== 'undefined'
  const hasNavigatorClipboardWriteFunction = !!navigator?.clipboard?.write
  return hasFetch && hasClipboardItem && hasNavigatorClipboardWriteFunction
}
