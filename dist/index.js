function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function getBlobFromImageSource(imageSource) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${imageSource}`);
        return yield response.blob();
    });
}
function isJpegBlob(blob) {
    return blob.type.includes('jpeg');
}
function isPngBlob(blob) {
    return blob.type.includes('png');
}
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
function convertBlobToPng(imageBlob) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageSource = URL.createObjectURL(imageBlob);
        const imageElement = yield createImageElement(imageSource);
        return yield getBlobFromImageElement(imageElement);
    });
}
function copyBlobToClipboard(blob) {
    return __awaiter(this, void 0, void 0, function* () {
        const items = { [blob.type]: blob };
        const clipboardItem = new ClipboardItem(items);
        yield navigator.clipboard.write([clipboardItem]);
    });
}
function copyImageToClipboard(imageSource) {
    return __awaiter(this, void 0, void 0, function* () {
        const blob = yield getBlobFromImageSource(imageSource);
        if (isJpegBlob(blob)) {
            const pngBlob = yield convertBlobToPng(blob);
            copyBlobToClipboard(pngBlob);
            return;
        }
        else if (isPngBlob(blob)) {
            copyBlobToClipboard(blob);
            return;
        }
        throw new Error('Cannot copy this type of image to clipboard');
    });
}
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
function canCopyImagesToClipboard() {
    var _a;
    const hasFetch = typeof fetch !== 'undefined';
    const hasClipboardItem = typeof ClipboardItem !== 'undefined';
    const hasNavigatorClipboardWriteFunction = !!((_a = navigator === null || navigator === void 0 ? void 0 : navigator.clipboard) === null || _a === void 0 ? void 0 : _a.write);
    return hasFetch && hasClipboardItem && hasNavigatorClipboardWriteFunction;
}

export { canCopyImagesToClipboard, convertBlobToPng, copyBlobToClipboard, copyImageToClipboard, createImageElement, getBlobFromImageElement, getBlobFromImageSource, isJpegBlob, isPngBlob, requestClipboardWritePermission };
