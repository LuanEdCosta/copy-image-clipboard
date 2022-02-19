'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/**
 * Gets a blob from an image source attribute using the Fetch API.
 *
 * @param {string} imageSource The image source attribute.
 * @returns {Promise<Blob>} A promise that resolves to a image blob.
 */
function getBlobFromImageSource(imageSource) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${imageSource}`);
        return yield response.blob();
    });
}
/**
 * Checks if is a JPEG image blob.
 *
 * @param {Blob} blob A blob.
 * @returns {boolean} A boolean indicating if the blob is a JPEG image or not.
 */
function isJpegBlob(blob) {
    return blob.type.includes('jpeg');
}
/**
 * Checks if is a PNG image blob.
 *
 * @param {Blob} blob A blob.
 * @returns {boolean} A boolean indicating if the blob is a PNG image or not.
 */
function isPngBlob(blob) {
    return blob.type.includes('png');
}
/**
 * Created an image element for a given image source attribute.
 *
 * @param {string} imageSource The image source attribute.
 * @returns {Promise<HTMLImageElement>} A promise that resolves to an image element. Rejects the promise if cannot create an image element.
 */
function createImageElement(imageSource) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            const imageElement = document.createElement('img');
            imageElement.crossOrigin = 'anonymous';
            imageElement.src = imageSource;
            imageElement.onload = function (event) {
                const target = event.target;
                resolve(target);
            };
            imageElement.onabort = reject;
            imageElement.onerror = reject;
        });
    });
}
/**
 * Gets a blob from an image element.
 *
 * @param {HTMLImageElement} imageElement An image element
 * @returns {Promise<Blob>} A Promise that resolves to a image blob. Rejects the promise if cannot get a blob from the image element.
 */
function getBlobFromImageElement(imageElement) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (context) {
                const { width, height } = imageElement;
                canvas.width = width;
                canvas.height = height;
                context.drawImage(imageElement, 0, 0, width, height);
                canvas.toBlob(function (blob) {
                    if (blob)
                        resolve(blob);
                    else
                        reject('Cannot get blob from image element');
                }, 'image/png', 1);
            }
        });
    });
}
/**
 * Converts a JPEG image blob to PNG.
 *
 * @param {Blob} imageBlob JPEG blob that will be converted to PNG.
 * @returns {Promise<Blob>} A Promise that resolves to a PNG image blob. Rejects the promise if cannot create an image element or if cannot get a blob from the image element.
 */
function convertBlobToPng(imageBlob) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageSource = URL.createObjectURL(imageBlob);
        const imageElement = yield createImageElement(imageSource);
        return yield getBlobFromImageElement(imageElement);
    });
}
/**
 * Copies a blob to user's clipboard.
 *
 * Throws an error if cannot write on the user's clipboard.
 *
 * @param {Blob} blob Blob to be copied.
 */
function copyBlobToClipboard(blob) {
    return __awaiter(this, void 0, void 0, function* () {
        const items = { [blob.type]: blob };
        const clipboardItem = new ClipboardItem(items);
        yield navigator.clipboard.write([clipboardItem]);
    });
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
function copyImageToClipboard(imageSource) {
    return __awaiter(this, void 0, void 0, function* () {
        const blob = yield getBlobFromImageSource(imageSource);
        if (isJpegBlob(blob)) {
            const pngBlob = yield convertBlobToPng(blob);
            yield copyBlobToClipboard(pngBlob);
            return blob;
        }
        else if (isPngBlob(blob)) {
            yield copyBlobToClipboard(blob);
            return blob;
        }
        throw new Error('Cannot copy this type of image to clipboard');
    });
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
function requestClipboardWritePermission() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!((_a = navigator === null || navigator === void 0 ? void 0 : navigator.permissions) === null || _a === void 0 ? void 0 : _a.query))
            return false;
        const { state } = yield navigator.permissions.query({
            name: 'clipboard-write',
        });
        return state === 'granted';
    });
}
/**
 * Checks if can copy images to the clipboard using the Fetch API and the Clipboard API.
 *
 * @returns {Boolean} A boolean indicating if can copy or not.
 */
function canCopyImagesToClipboard() {
    var _a;
    const hasFetch = typeof fetch !== 'undefined';
    const hasClipboardItem = typeof ClipboardItem !== 'undefined';
    const hasNavigatorClipboardWriteFunction = !!((_a = navigator === null || navigator === void 0 ? void 0 : navigator.clipboard) === null || _a === void 0 ? void 0 : _a.write);
    return hasFetch && hasClipboardItem && hasNavigatorClipboardWriteFunction;
}

exports.canCopyImagesToClipboard = canCopyImagesToClipboard;
exports.convertBlobToPng = convertBlobToPng;
exports.copyBlobToClipboard = copyBlobToClipboard;
exports.copyImageToClipboard = copyImageToClipboard;
exports.createImageElement = createImageElement;
exports.getBlobFromImageElement = getBlobFromImageElement;
exports.getBlobFromImageSource = getBlobFromImageSource;
exports.isJpegBlob = isJpegBlob;
exports.isPngBlob = isPngBlob;
exports.requestClipboardWritePermission = requestClipboardWritePermission;
