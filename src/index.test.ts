import {
  isPngBlob,
  isJpegBlob,
  convertBlobToPng,
  createImageElement,
  copyBlobToClipboard,
  copyImageToClipboard,
  getBlobFromImageSource,
  getBlobFromImageElement,
  canCopyImagesToClipboard,
  requestClipboardWritePermission,
} from '.'

describe('All Tests', () => {
  const oldCreateElement = document.createElement.bind(document)

  const mockDocumentCreateElement = () => {
    document.createElement = jest.fn().mockImplementation((tagName) => {
      if (tagName !== 'img') return oldCreateElement(tagName)
      return Object.defineProperty({}, 'onload', {
        set(fn) {
          const event = { target: oldCreateElement('img') }
          fn(event)
          return () => {}
        },
      })
    })
  }

  beforeAll(() => {
    window.fetch = jest.fn().mockImplementation((url: string) => {
      let blobType = ''

      const isJpeg = url.includes('.jpg') || url.includes('.jpeg')
      const isPng = url.includes('.png')

      if (isJpeg) blobType = 'image/jpeg'
      else if (isPng) blobType = 'image/png'
      else blobType = 'image/gif'

      return {
        blob: () => new Blob([], { type: blobType }),
      }
    })

    window.URL.createObjectURL = jest.fn().mockImplementation(() => {
      return Math.random().toString()
    })

    window.ClipboardItem = jest.fn()

    Object.defineProperty(navigator, 'clipboard', {
      value: {
        write: jest.fn(),
      },
    })

    Object.defineProperty(navigator, 'permissions', {
      value: {
        query: jest.fn(() => ({ state: 'granted' })),
      },
    })
  })

  it('should get a blob from the image source', async () => {
    const blob = await getBlobFromImageSource('source.jpg')
    expect(blob).toBeInstanceOf(Blob)
  })

  it('should check if a blob is a jpeg image', () => {
    expect(isJpegBlob(new Blob([], { type: 'image/jpeg' }))).toBe(true)
    expect(isJpegBlob(new Blob([], { type: 'image/gif' }))).toBe(false)
  })

  it('should check if a blob is a png image', () => {
    expect(isPngBlob(new Blob([], { type: 'image/png' }))).toBe(true)
    expect(isPngBlob(new Blob([], { type: 'image/gif' }))).toBe(false)
  })

  it('should get a blob from an image element', async () => {
    const imageElement = document.createElement('img')
    const blob = await getBlobFromImageElement(imageElement)
    expect(blob).toBeInstanceOf(Blob)
  })

  it('should create an image element', async () => {
    mockDocumentCreateElement()

    const imageElement = await createImageElement('source')
    expect(imageElement).not.toBe(undefined)
    expect(imageElement.src).not.toBe(undefined)

    document.createElement = oldCreateElement
  })

  it('should convert a jpeg blob to a png blob', async () => {
    mockDocumentCreateElement()

    const jpegBlob = new Blob([], { type: 'image/jpeg' })
    expect(jpegBlob.type).toBe('image/jpeg')
    const pngBlob = await convertBlobToPng(jpegBlob)
    expect(pngBlob.type).toBe('image/png')

    document.createElement = oldCreateElement
  })

  it('should copy a blob to clipboard', () => {
    const blob = new Blob([], { type: 'image/png' })
    copyBlobToClipboard(blob)
    expect(window.ClipboardItem).toBeCalledWith({ [blob.type]: blob })
    expect(navigator.clipboard.write).toBeCalled()
  })

  it('should copy a png image to clipboard', async () => {
    const blob = new Blob([], { type: 'image/png' })
    await copyImageToClipboard('source.png')
    expect(window.ClipboardItem).toBeCalledWith({ [blob.type]: blob })
    expect(navigator.clipboard.write).toBeCalled()
  })

  it('should copy a jpeg image to clipboard', async () => {
    mockDocumentCreateElement()

    const blob = new Blob([], { type: 'image/jpeg' })
    await copyImageToClipboard('source.jpg')
    expect(window.ClipboardItem).toBeCalledWith({ 'image/png': blob })
    expect(navigator.clipboard.write).toBeCalled()

    document.createElement = oldCreateElement
  })

  it('should throw an error if the image cannot be copied', async () => {
    await expect(copyImageToClipboard('source.gif')).rejects.toThrow()
  })

  it('should check if can copy images to clipboard', () => {
    expect(canCopyImagesToClipboard()).toBe(true)
  })

  it('should grant the permission to write in the clipboard', async () => {
    const hasPermission = await requestClipboardWritePermission()
    expect(hasPermission).toBe(true)
    expect(navigator.permissions.query).toBeCalledWith({
      name: 'clipboard-write',
    })
  })

  it('should deny the permission to write in the clipboard', async () => {
    const oldNavigator = navigator
    Object.defineProperty(window, 'navigator', {
      value: {
        permissions: undefined,
      },
    })

    const hasPermission = await requestClipboardWritePermission()
    expect(navigator.permissions).toBe(undefined)
    expect(hasPermission).toBe(false)

    Object.defineProperty(window, 'navigator', {
      value: oldNavigator,
    })
  })
})
