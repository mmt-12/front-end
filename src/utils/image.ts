// import imageCompression from 'browser-image-compression'
import GIF from 'gif.js'
import { decompressFrames, parseGIF } from 'gifuct-js'
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

export async function getCroppedGif(
  imageSrc: string,
  pixelCrop: Area,
): Promise<File> {
  const gifBlob = await fetch(imageSrc).then(res => res.blob())
  const buffer = await gifBlob.arrayBuffer()
  const gif = parseGIF(buffer)
  const frames = decompressFrames(gif, true)

  const gifEncoder = new GIF({
    workers: 2,
    quality: 10,
    width: pixelCrop.width,
    height: pixelCrop.height,
    workerScript: '/gif.worker.js',
  })

  const tempCanvas = document.createElement('canvas')
  const tempCtx = tempCanvas.getContext('2d')

  if (!tempCtx) {
    throw new Error('Canvas 2d context is null')
  }

  // Set canvas to full GIF size
  tempCanvas.width = gif.lsd.width
  tempCanvas.height = gif.lsd.height

  // Helper to store previous frame state for disposalType === 3 (Restore to Previous)
  let previousFrameData: ImageData | null = null

  for (const frame of frames) {
    const { width, height, top, left } = frame.dims

    // Save current state for disposalType === 3
    if (frame.disposalType === 3) {
      previousFrameData = tempCtx.getImageData(
        0,
        0,
        tempCanvas.width,
        tempCanvas.height,
      )
    }

    // Draw the current frame patch
    const frameImageData = new ImageData(frame.patch, width, height)
    const patchCanvas = document.createElement('canvas')
    patchCanvas.width = width
    patchCanvas.height = height
    const patchCtx = patchCanvas.getContext('2d')

    if (patchCtx) {
      patchCtx.putImageData(frameImageData, 0, 0)
      tempCtx.drawImage(patchCanvas, left, top)
    }

    // Create cropped frame
    const croppedCanvas = document.createElement('canvas')
    croppedCanvas.width = pixelCrop.width
    croppedCanvas.height = pixelCrop.height
    const croppedCtx = croppedCanvas.getContext('2d')

    if (!croppedCtx) {
      continue
    }

    croppedCtx.drawImage(
      tempCanvas,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    )

    gifEncoder.addFrame(croppedCanvas, { delay: frame.delay })

    // Handle disposal
    if (frame.disposalType === 2) {
      // Restore to background (clear the area)
      tempCtx.clearRect(left, top, width, height)
    } else if (frame.disposalType === 3 && previousFrameData) {
      // Restore to previous
      tempCtx.putImageData(previousFrameData, 0, 0)
    }
  }

  return new Promise(resolve => {
    gifEncoder.on('finished', (blob: Blob) => {
      resolve(new File([blob], 'cropped.gif', { type: 'image/gif' }))
    })
    gifEncoder.render()
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
