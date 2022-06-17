/**
 * Gets a blob from an image source attribute using the Fetch API.
 *
 * @param {string} imageSource The image source attribute.
 * @returns {Promise<Blob>} A promise that resolves to a image blob.
 */
export async function getBlobFromImageSource(
  imageSource: string,
): Promise<Blob> {
  const response = await fetch(`${imageSource}`)
  return await response.blob()
}

/**
 * Checks if is a JPEG image blob.
 *
 * @param {Blob} blob A blob.
 * @returns {boolean} A boolean indicating if the blob is a JPEG image or not.
 */
export function isJpegBlob(blob: Blob): boolean {
  return blob.type.includes('jpeg')
}

/**
 * Checks if is a PNG image blob.
 *
 * @param {Blob} blob A blob.
 * @returns {boolean} A boolean indicating if the blob is a PNG image or not.
 */
export function isPngBlob(blob: Blob): boolean {
  return blob.type.includes('png')
}

/**
 * Created an image element for a given image source attribute.
 *
 * @param {string} imageSource The image source attribute.
 * @returns {Promise<HTMLImageElement>} A promise that resolves to an image element. Rejects the promise if cannot create an image element.
 */
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

/**
 * Gets a blob from an image element.
 *
 * @param {HTMLImageElement} imageElement An image element
 * @returns {Promise<Blob>} A Promise that resolves to a image blob. Rejects the promise if cannot get a blob from the image element.
 */
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

/**
 * Converts a JPEG image blob to PNG.
 *
 * @param {Blob} imageBlob JPEG blob that will be converted to PNG.
 * @returns {Promise<Blob>} A Promise that resolves to a PNG image blob. Rejects the promise if cannot create an image element or if cannot get a blob from the image element.
 */
export async function convertBlobToPng(imageBlob: Blob): Promise<Blob> {
  const imageSource = URL.createObjectURL(imageBlob)
  const imageElement = await createImageElement(imageSource)
  return await getBlobFromImageElement(imageElement)
}

/**
 * Copies a blob to user's clipboard.
 *
 * Throws an error if cannot write on the user's clipboard.
 *
 * @param {Blob[]} blobs Blobs to copy.
 */
export async function copyBlobToClipboard(...blobs: Blob[]): Promise<void> {
  const clipboardItems = blobs.map((blob) => {
    const item = { [blob.type]: blob } as unknown as Record<
      string,
      ClipboardItemData
    >

    return new ClipboardItem(item)
  })

  await navigator.clipboard.write(clipboardItems)
}

/**
 * Copies a PNG or JPEG image to clipboard.
 *
 * This function downloads the image to copy with it's original dimensions.
 *
 * - If the image is JPEG it will be converted automatically to PNG and then copied.
 * - If the image is not PNG or JPEG an error will be thrown.
 *
 * @param {string} imageSource The image source attribute.
 * @returns {Promise<Blob>} A promise that resolves to a blob. Generally you don't need to use the returned blob for nothing.
 */
export async function copyImageToClipboard(imageSource: string): Promise<Blob> {
  const blob = await getBlobFromImageSource(imageSource)

  if (isJpegBlob(blob)) {
    const pngBlob = await convertBlobToPng(blob)
    await copyBlobToClipboard(pngBlob)
    return blob
  } else if (isPngBlob(blob)) {
    await copyBlobToClipboard(blob)
    return blob
  }

  throw new Error('Cannot copy this type of image to clipboard')
}

/**
 * Copies multiple PNG or JPEG images to clipboard.
 *
 * This function downloads all images to copy with the original dimensions.
 *
 * - If an image is JPEG it will be converted automatically to PNG and then copied.
 * - If an image is not PNG or JPEG an error will be thrown.
 *
 * @param {string[]} imageSources Image sources.
 * @returns {Promise<Blob[]>} A promise that resolves to an array of blobs. Generally you don't need to use the returned blob for nothing.
 */
export async function copyMultipleImagesToClipboard(
  ...imageSources: string[]
): Promise<Blob[]> {
  const promises = imageSources.map((imageSource) => {
    return getBlobFromImageSource(imageSource)
  })

  const blobs = await Promise.all(promises)

  const pngBlobPromises = blobs.map((blob) => {
    if (isPngBlob(blob)) return blob
    else if (isJpegBlob(blob)) return convertBlobToPng(blob)
    return Promise.reject('Can only copy JPG and PNG images')
  })

  const pngBlobs = await Promise.all(pngBlobPromises)

  await copyBlobToClipboard(...pngBlobs)

  return pngBlobs
}

/**
 * Requests the permission to write data on the user's clipboard.
 *
 * Reasons why you generally don't need to use this function:
 *
 * - The Permission to write data on the clipboard is automatically granted to pages when they are in the browser active tab.
 * - If the browser has not implemented the Permissions API yet, this function will return false.
 *
 * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating if the permission was granted or not.
 */
export async function requestClipboardWritePermission(): Promise<boolean> {
  if (!navigator?.permissions?.query) return false

  const { state } = await navigator.permissions.query({
    name: 'clipboard-write' as PermissionName,
  })

  return state === 'granted'
}

/**
 * Checks if can copy images to the clipboard using the Fetch API and the Clipboard API.
 *
 * @returns {Boolean} A boolean indicating if can copy or not.
 */
export function canCopyImagesToClipboard(): boolean {
  const hasFetch = typeof fetch !== 'undefined'
  const hasClipboardItem = typeof ClipboardItem !== 'undefined'
  const hasNavigatorClipboardWriteFunction = !!navigator?.clipboard?.write
  return hasFetch && hasClipboardItem && hasNavigatorClipboardWriteFunction
}
