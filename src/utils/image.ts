import imageCompression from 'browser-image-compression'
import JSZip from "jszip";

export function compressImages (images: string[]) {
  // Image compression
  const zip = new JSZip();

  const fetchAndCompress = async (url: string, index: number) => {
    url = encodeURI(url);
    const response = await fetch(url);
    const blob = await response.blob();
    zip.file(`image_${index}${getExtension(url)}`, blob);
  };

  function getExtension (url: string) {
    const match = url.match(/\.\w+$/);
    return match ? match[0] : ".jpg";
  }

  return Promise.all(images.map((url, i) => fetchAndCompress(url, i)))
    .then(() => zip.generateAsync({ type: "blob" }));

}

export function downloadBlob (blob: Blob, fileName: string) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function compressImage (file: File): Promise<File> {
  const options = {
    maxSizeMB: 0.9, // 허용하는 최대 사이즈 지정
    maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
    useWebWorker: true, // webworker 사용 여부
  }
  console.log('Original file size:', (file.size / 1024 / 1024).toFixed(2), 'MB')
  const blob = await imageCompression(file, options)
  console.log('Compressed file size:', (blob.size / 1024 / 1024).toFixed(2), 'MB')
  return blobToFile(blob, file.name, file.type)
}

function blobToFile (blob: Blob, fileName: string, mimeType: string) {
  return new File([blob], fileName, {
    type: mimeType,
    lastModified: Date.now(),
  })
}
