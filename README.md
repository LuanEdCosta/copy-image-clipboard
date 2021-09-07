<h1 style="text-align: center">
  <span>Copy Image Clipboard</span>
</h1>

<p style="text-align: center">
  <a href="https://www.npmjs.com/package/copy-image-clipboard">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/copy-image-clipboard">
  </a>

  <a href="https://www.npmjs.com/package/copy-image-clipboard">
    <img alt="NPM Downloads Per Week" src="https://img.shields.io/npm/dw/copy-image-clipboard">
  </a>

  <a href="https://github.com/LuanEdCosta/copy-image-clipboard/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/luanedcosta/copy-image-clipboard.svg">
  </a>

  <a href="https://github.com/luanedcosta/copy-image-clipboard/commits/master">
    <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/luanedcosta/copy-image-clipboard.svg">
  </a>

  <a href="https://github.com/luanedcosta/copy-image-clipboard/issues">
    <img alt="Repository Issues" src="https://img.shields.io/github/issues/luanedcosta/copy-image-clipboard.svg">
  </a>

  <a href="https://www.npmjs.com/package/copy-image-clipboard?activeTab=dependencies">
    <img alt="Dependencies" src="https://img.shields.io/david/LuanEdCosta/copy-image-clipboard">
  </a>
</p>

Created with :heart: by Luan Eduardo da Costa | [Follow me on Linkedin](https://www.linkedin.com/in/luaneducosta/)

---

## :page_with_curl: About

This library allows you to **copy JPG and PNG images (only)** to clipboard easily. Can be used with React, Vue, Angular and other web frameworks.

It uses the new browser Clipboard API and has **no external dependencies**.

:point_right: [CLICK HERE](https://luanedcosta.github.io/copy-image-clipboard/) to see the demo project in your browser.

## :white_check_mark: Installation

### Using **yarn**

```bash
yarn add copy-image-clipboard
```

### Using **npm**

```bash
npm i copy-image-clipboard
```

### Downloading The Source Code

1. Download [dist/index.browser.js](https://github.com/LuanEdCosta/copy-image-clipboard/tree/master/dist/index.browser.js) or other file from the [dist](https://github.com/LuanEdCosta/copy-image-clipboard/tree/master/dist) folder.
2. Put wherever you want :smile:.

Abou the **dist** folder:

- The **index.browser.js** file is minified to use in browsers and exposes everything from this library in a variable called **CopyImageClipboard**. Ex: `CopyImageClipboard.copyImageToClipboard('...')`.
- The **index.js** file uses the ES Modules module format and is not minified.
- The **index.common.js** file uses the CommonJs module format and is not minified.
- The **index.d.ts** file contains TypeScript types.

## :zap: Usage

### Copy using the image source

:point_right: <img **src="..."**>

This approach downloads the image using `window.fetch`, transform to PNG if is JPEG and then copy to clipboard using the image original dimensions.

```javascript
// Import the copy function
import { copyImageToClipboard } from 'copy-image-clipboard'

// Pass the image src attribute here
copyImageToClipboard('assets/image.png')
  .then(() => {
    console.log('Image Copied')
  })
  .catch((e) => {
    console.log('Error: ', e.message)
  })

// Can be an URL too, but be careful because this may cause CORS errors
copyImageToClipboard(
  'https://images-na.ssl-images-amazon.com/images/I/81BES%2BtsVvL.png',
)
  .then(() => {
    console.log('Image Copied')
  })
  .catch((e) => {
    console.log('Error: ', e.message)
  })
```

### Copy image rendered in the document

With this approach no HTTP request is necessary, but the image is copied with the image element dimensions in the document. If the image is 1000x1000 but is shown as 300x300, the copied image will be 300x300. Use `copyImageToClipboard` function to copy the image with its original dimensions.

```javascript
import {
  getBlobFromImageElement,
  copyBlobToClipboard,
} from 'copy-image-clipboard'

const imageElement = document.getElementById('image')

getBlobFromImageElement(imageElement)
  .then((blob) => {
    return copyBlobToClipboard(blob)
  })
  .then(() => {
    console.log('Blob Copied')
  })
  .catch((e) => {
    console.log('Error: ', e.message)
  })
```

### Check if can copy images to clipboard

Use this function to check synchronously in runtime if can copy images to clipboard. It checks if can use the Fetch API and the Clipboard API.

```javascript
import { canCopyImagesToClipboard } from 'copy-image-clipboard'

const canCopy = canCopyImagesToClipboard()

console.log('Can Copy Images To Clipboard:', canCopy)
```

### Check if the permission to write data on clipboard was granted

**Warnings:**

- The permission to write data on the clipboard is granted automatically to pages when they are in the active tab, so generally you don't need to use this function.
- If the browser has not implemented the Permissions API yet, this function will return `false`. Check the browser compatibility here: [Permissions API Browser Compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API#browser_compatibility).

```javascript
import { requestClipboardWritePermission } from 'copy-image-clipboard'

requestClipboardWritePermission().then((hasPermission) => {
  console.log('Has Permission:', hasPermission)
})
```

## :star: Demos

- React + TypeScript - [See in your browser](https://github.com/LuanEdCosta/copy-image-clipboard/tree/master/demo)

## :globe_with_meridians: Compatibility

This project uses the asynchronous Clipboard API and Fetch API. Most browsers already support these two APIs natively, but for the old ones such as Internet Explorer this library doesn't work and there is nothing you can do about it.

Use the links below to see the browser compatibility:

- [Clipboard API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard)
- [Clipboard API - Can I Use](https://caniuse.com/?search=clipboard)
- [Fetch - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Fetch - Can I Use](https://caniuse.com/?search=fetch)

### Enable Clipboard API Features in Firefox

**From Version 87:** You need to set `dom.events.asyncClipboard.clipboardItem` preference to `true`. To change preferences in Firefox, visit `about:config`.

## :stop_sign: Known Limitations

**For now you can copy only JPG and PNG images**

Other image types are not supported. If you try to copy other type an error will be thrown.

**This library only works in pages with HTTPS**

This limitation was defined by the browsers due to security risks involved when dealing with the user's clipboard.

**You can only copy an image in the user's active tab/document**

If the user is navigating in another tab and the copy function is called, an error will be thrown.

## :handshake: Contribution

Every kind of help is appreciated and this project can be better with your help.

What you can do:

- Take a look at the [Projects Tab](https://github.com/LuanEdCosta/copy-image-clipboard/projects) on GitHub to see some tasks that need to be done.
- [Create an issue](https://github.com/LuanEdCosta/copy-image-clipboard/issues) to suggest an improvement or to describe a bug.
- Read the [Contribution Guide](CONTRIBUTING.md) to see how to contribute with code.

## :blue_book: License

This project is under the [MIT LICENSE](https://github.com/LuanEdCosta/copy-image-clipboard/blob/master/LICENSE).
