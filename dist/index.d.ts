/**
 * Gets a blob from an image source attribute using the Fetch API.
 *
 * @param {string} imageSource The image source attribute.
 * @returns {Promise<Blob>} A promise that resolves to a image blob.
 */
export declare function getBlobFromImageSource(imageSource: string): Promise<Blob>;
/**
 * Checks if is a JPEG image blob.
 *
 * @param {Blob} blob A blob.
 * @returns {boolean} A boolean indicating if the blob is a JPEG image or not.
 */
export declare function isJpegBlob(blob: Blob): boolean;
/**
 * Checks if is a PNG image blob.
 *
 * @param {Blob} blob A blob.
 * @returns {boolean} A boolean indicating if the blob is a PNG image or not.
 */
export declare function isPngBlob(blob: Blob): boolean;
/**
 * Created an image element for a given image source attribute.
 *
 * @param {string} imageSource The image source attribute.
 * @returns {Promise<HTMLImageElement>} A promise that resolves to an image element. Rejects the promise if cannot create an image element.
 */
export declare function createImageElement(imageSource: string): Promise<HTMLImageElement>;
/**
 * Gets a blob from an image element.
 *
 * @param {HTMLImageElement} imageElement An image element
 * @returns {Promise<Blob>} A Promise that resolves to a image blob. Rejects the promise if cannot get a blob from the image element.
 */
export declare function getBlobFromImageElement(imageElement: HTMLImageElement): Promise<Blob>;
/**
 * Converts a JPEG image blob to PNG.
 *
 * @param {Blob} imageBlob JPEG blob that will be converted to PNG.
 * @returns {Promise<Blob>} A Promise that resolves to a PNG image blob. Rejects the promise if cannot create an image element or if cannot get a blob from the image element.
 */
export declare function convertBlobToPng(imageBlob: Blob): Promise<Blob>;
/**
 * Copies a blob to user's clipboard.
 *
 * Throws an error if cannot write on the user's clipboard.
 *
 * @param {Blob} blob Blob to be copied.
 */
export declare function copyBlobToClipboard(blob: Blob): Promise<void>;
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
export declare function copyImageToClipboard(imageSource: string): Promise<Blob>;
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
export declare function requestClipboardWritePermission(): Promise<boolean>;
/**
 * Checks if can copy images to the clipboard using the Fetch API and the Clipboard API.
 *
 * @returns {Boolean} A boolean indicating if can copy or not.
 */
export declare function canCopyImagesToClipboard(): boolean;
