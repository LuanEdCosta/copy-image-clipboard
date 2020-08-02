import React, { useRef } from 'react'
import copyImg from 'copy-image-clipboard'
import jpgImage from './jpgImage.jpg'
import pngImage from './pngImage.png'
import './App.css'

function App() {
  const jpgImageRef = useRef()
  const pngImageRef = useRef()

  const copyJpgImage = async () => {
    try {
      const src = jpgImageRef.current.src
      await copyImg(src)
      alert('JPG image Copied')
    } catch (e) {
      console.log(e)
    }
  }

  const copyPngImage = async () => {
    try {
      const src = pngImageRef.current.src
      await copyImg(src)
      alert('PNG image Copied')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="app">
      <div className="img-container">
        <img ref={jpgImageRef} className="img" src={jpgImage} alt="jpg image" />
        <button className="button" type="button" onClick={copyJpgImage}>
          Copy JPG Image to Clipboard
        </button>
      </div>

      <div className="img-container">
        <img ref={pngImageRef} className="img" src={pngImage} alt="png image" />
        <button className="button" type="button" onClick={copyPngImage}>
          Copy PNG Image to Clipboard
        </button>
      </div>
    </div>
  )
}

export default App
