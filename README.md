<h1 style="text-align: center">
  <span>Copy Image Clipboard</span>
</h1>

<p style="text-align: center">
  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/luanedcosta/copy-image-clipboard.svg">

  <img alt="NPM Version" src="https://img.shields.io/npm/v/copy-image-clipboard">

  <img alt="License" src="https://img.shields.io/github/license/luanedcosta/copy-image-clipboard.svg">

  <img alt="NPM Downloads Per Week" src="https://img.shields.io/npm/dw/copy-image-clipboard">

  <a href="https://github.com/luanedcosta/copy-image-clipboard/commits/master">
    <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/luanedcosta/copy-image-clipboard.svg">
  </a>

  <a href="https://github.com/luanedcosta/copy-image-clipboard/issues">
    <img alt="Repository Issues" src="https://img.shields.io/github/issues/luanedcosta/copy-image-clipboard.svg">
  </a>

  <img alt="Dependencies" src="https://img.shields.io/david/LuanEdCosta/copy-image-clipboard">
</p>

Created with :heart: by Luan Eduardo da Costa | <luan1346@gmail.com>

---

## :page_with_curl: About

This library helps you to copy JPG and PNG images to clipboard easily. Can be used with React, Vue, Angular and other web frameworks.

It uses the new browser Clipboard API and has **no external dependencies**.

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

```javascript
// Import the copy function
import copyImg from 'copy-image-clipboard'

// Use the image src attribute here
copyImg('imageSrc')
```

See the `demo` folder for a more detailed example with React.

## :globe_with_meridians: Compatibility

- Created and tested using **Chrome 84.0**

This project uses the asynchronous Clipboard API and the Fetch API. Use the links below to see the browser compatibility:

- [Clipboard API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard)
- [Fetch - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## :blue_book: License

This project is under the MIT license. See the [LICENSE](https://github.com/LuanEdCosta/copy-image-clipboard/blob/master/LICENSE) for more information.
