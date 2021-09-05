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
function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function getBlobFromImageSource(imageSource) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch(imageSource + "?crossorigin")];
                case 1:
                    response = _a.sent();
                    return [4, response.blob()];
                case 2: return [2, _a.sent()];
            }
        });
    });
}
function isJpegBlob(blob) {
    return blob.type.includes('jpeg');
}
function isPngBlob(blob) {
    return blob.type.includes('png');
}
function createImageElement(imageSource) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, new Promise(function (resolve, reject) {
                    var imageElement = document.createElement('img');
                    imageElement.crossOrigin = 'anonymous';
                    imageElement.src = imageSource;
                    imageElement.onload = function (event) {
                        var target = event.target;
                        resolve(target);
                    };
                    imageElement.onabort = reject;
                    imageElement.onerror = reject;
                })];
        });
    });
}
function getBlobFromImageElement(imageElement) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, new Promise(function (resolve, reject) {
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');
                    if (context) {
                        var width = imageElement.width, height = imageElement.height;
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
                })];
        });
    });
}
function convertBlobToPng(imageBlob) {
    return __awaiter(this, void 0, void 0, function () {
        var imageSource, imageElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imageSource = URL.createObjectURL(imageBlob);
                    return [4, createImageElement(imageSource)];
                case 1:
                    imageElement = _a.sent();
                    return [4, getBlobFromImageElement(imageElement)];
                case 2: return [2, _a.sent()];
            }
        });
    });
}
function copyBlobToClipboard(blob) {
    var _a;
    var items = (_a = {}, _a[blob.type] = blob, _a);
    var clipboardItem = new ClipboardItem(items);
    navigator.clipboard.write([clipboardItem]);
}
function copyImageToClipboard(imageSource) {
    return __awaiter(this, void 0, void 0, function () {
        var blob, pngBlob;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, getBlobFromImageSource(imageSource)];
                case 1:
                    blob = _a.sent();
                    if (!isJpegBlob(blob)) return [3, 3];
                    return [4, convertBlobToPng(blob)];
                case 2:
                    pngBlob = _a.sent();
                    copyBlobToClipboard(pngBlob);
                    return [3, 4];
                case 3:
                    if (isPngBlob(blob)) {
                        copyBlobToClipboard(blob);
                    }
                    _a.label = 4;
                case 4: return [2];
            }
        });
    });
}

exports.convertBlobToPng = convertBlobToPng;
exports.copyBlobToClipboard = copyBlobToClipboard;
exports.copyImageToClipboard = copyImageToClipboard;
exports.createImageElement = createImageElement;
exports.getBlobFromImageElement = getBlobFromImageElement;
exports.getBlobFromImageSource = getBlobFromImageSource;
exports.isJpegBlob = isJpegBlob;
exports.isPngBlob = isPngBlob;
