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

This library helps you to copy JPG and PNG images to clipboard easily. Can be used with React, Vue, Angular and other web frameworks.

It uses the new browser Clipboard API and has **no external dependencies**.

:point_right: [CLICK HERE](https://luanedcosta.github.io/copy-image-clipboard/) to see the demo project in your browser.

## :white_check_mark: Installation

- Using **yarn**

```bash
yarn add copy-image-clipboard
```

- Using **npm**

```bash
npm i copy-image-clipboard
```

## :zap: Usage

### Copy using the image source

:point_right: <img **src="..."**>

This approach downloads the image using `window.fetch`, transform to PNG if is JPEG and then copy to clipboard using the image original dimensions.

```javascript
// Import the copy function
import { copyImageToClipboard } from 'copy-image-clipboard'

// Pass the image src attribute here
copyImageToClipboard('assets/image.png').then(() => {
  console.log('Image Copied')
})

// Can be an URL too, but be careful because this may cause CORS errors
copyImageToClipboard(
  'https://images-na.ssl-images-amazon.com/images/I/81BES%2BtsVvL.png',
).then(() => {
  console.log('Image Copied')
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
```

## :star: Demos

- [React + TypeScript](https://github.com/LuanEdCosta/copy-image-clipboard/tree/master/demo)

## :globe_with_meridians: Compatibility

This project uses the asynchronous Clipboard API and the Fetch API. Use the links below to see the browser compatibility:

- [Clipboard API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard)
- [Fetch - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## :stop_sign: Known Limitations

- For now you can copy only JPG and PNG images. Other image types are not supported.

## :handshake: Contribution

Every kind of help is appreciated and this project can be better with your help.

What you can do:

- Take a look at the [Projects Tab](https://github.com/LuanEdCosta/copy-image-clipboard/projects) on GitHub to see some tasks that need to be done.
- [Create an issue](https://github.com/LuanEdCosta/copy-image-clipboard/issues) to suggest an improvement or to describe a bug.
- Read the [Contribution Guide](CONTRIBUTING.md) to see how to contribute with code.

## :blue_book: License

This project is under the [MIT LICENSE](https://github.com/LuanEdCosta/copy-image-clipboard/blob/master/LICENSE).
