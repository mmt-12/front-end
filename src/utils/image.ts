// import imageCompression from 'browser-image-compression'
import JSZip from 'jszip'
import { type Area } from 'react-easy-crop'

export function compressImages(images: string[]) {
  // Image compression
  const zip = new JSZip()

  const fetchAndCompress = async (url: string, index: number) => {
    url = encodeURI(url)
    const response = await fetch(url)
    const blob = await response.blob()
    zip.file(`image_${index}${getExtension(url)}`, blob)
  }

  function getExtension(url: string) {
    const match = url.match(/\.\w+$/)
    return match ? match[0] : '.jpg'
  }

  return Promise.all(images.map((url, i) => fetchAndCompress(url, i))).then(
    () => zip.generateAsync({ type: 'blob' }),
  )
}

export function downloadBlob(blob: Blob, fileName: string) {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues
    image.src = url
  })

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
): Promise<File> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Canvas 2d context is null')
  }

  const safeArea = Math.max(image.width, image.height) * 2

  canvas.width = safeArea
  canvas.height = safeArea

  ctx.translate(safeArea / 2, safeArea / 2)
  ctx.translate(-image.width / 2, -image.height / 2)

  ctx.drawImage(image, 0, 0)

  const data = ctx.getImageData(0, 0, safeArea, safeArea)

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width / 2 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height / 2 - pixelCrop.y),
  )

  return new Promise(resolve => {
    canvas.toBlob(blob => {
      if (!blob) {
        throw new Error('Canvas is empty')
      }
      resolve(new File([blob], 'cropped.jpeg', { type: 'image/jpeg' }))
    }, 'image/jpeg')
  })
}

// export async function compressImage (file: File): Promise<File> {
//   const options = {
//     maxSizeMB: 0.9, // 허용하는 최대 사이즈 지정
//     maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
//     useWebWorker: true, // webworker 사용 여부
//   }
//   console.log('Original file size:', (file.size / 1024 / 1024).toFixed(2), 'MB')
//   const blob = await imageCompression(file, options)
//   console.log('Compressed file size:', (blob.size / 1024 / 1024).toFixed(2), 'MB')
//   return blobToFile(blob, file.name, file.type)
// }

// function blobToFile (blob: Blob, fileName: string, mimeType: string) {
//   return new File([blob], fileName, {
//     type: mimeType,
//     lastModified: Date.now(),
//   })
// }
