/* copy-image-clipboard 1.0.1 - Licensed MIT @ Luan Eduardo da Costa */
var CopyImageClipboard=function(n){"use strict";function t(n,t,e,o){return new(e||(e=Promise))((function(i,r){function c(n){try{a(o.next(n))}catch(n){r(n)}}function u(n){try{a(o.throw(n))}catch(n){r(n)}}function a(n){var t;n.done?i(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(c,u)}a((o=o.apply(n,t||[])).next())}))}function e(n){return t(this,void 0,void 0,(function*(){const t=yield fetch(`${n}`);return yield t.blob()}))}function o(n){return n.type.includes("jpeg")}function i(n){return n.type.includes("png")}function r(n){return t(this,void 0,void 0,(function*(){return new Promise((function(t,e){const o=document.createElement("img");o.crossOrigin="anonymous",o.src=n,o.onload=function(n){const e=n.target;t(e)},o.onabort=e,o.onerror=e}))}))}function c(n){return t(this,void 0,void 0,(function*(){return new Promise((function(t,e){const o=document.createElement("canvas"),i=o.getContext("2d");if(i){const{width:r,height:c}=n;o.width=r,o.height=c,i.drawImage(n,0,0,r,c),o.toBlob((function(n){n?t(n):e("Cannot get blob from image element")}),"image/png",1)}}))}))}function u(n){return t(this,void 0,void 0,(function*(){const t=URL.createObjectURL(n),e=yield r(t);return yield c(e)}))}function a(n){const t={[n.type]:n},e=new ClipboardItem(t);navigator.clipboard.write([e])}return n.convertBlobToPng=u,n.copyBlobToClipboard=a,n.copyImageToClipboard=function(n){return t(this,void 0,void 0,(function*(){const t=yield e(n);if(o(t)){a(yield u(t))}else{if(!i(t))throw new Error("Cannot copy this type of image to clipboard");a(t)}}))},n.createImageElement=r,n.getBlobFromImageElement=c,n.getBlobFromImageSource=e,n.isJpegBlob=o,n.isPngBlob=i,Object.defineProperty(n,"__esModule",{value:!0}),n}({});
