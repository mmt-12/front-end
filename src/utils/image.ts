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