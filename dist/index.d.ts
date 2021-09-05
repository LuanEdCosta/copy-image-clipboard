export declare function getBlobFromImageSource(imageSource: string): Promise<Blob>;
export declare function isJpegBlob(blob: Blob): boolean;
export declare function isPngBlob(blob: Blob): boolean;
export declare function createImageElement(imageSource: string): Promise<HTMLImageElement>;
export declare function getBlobFromImageElement(imageElement: HTMLImageElement): Promise<Blob>;
export declare function convertBlobToPng(imageBlob: Blob): Promise<Blob>;
export declare function copyBlobToClipboard(blob: Blob): void;
export declare function copyImageToClipboard(imageSource: string): Promise<void>;
