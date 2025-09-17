import { useRef, useState } from 'react'

import { useModal } from './useModal'

export default function useRecord() {
  const [isRecording, setIsRecording] = useState(false)
  const [audio, setAudio] = useState<File | null>(null)

  const audioRef = useRef<HTMLAudioElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder>(null)

  const { alert } = useModal()

  const handleRecordClick = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then(stream => {
          const mediaRecorder = new MediaRecorder(stream)
          mediaRecorderRef.current = mediaRecorder
          setIsRecording(true)
          mediaRecorder.start()

          const chunks: Blob[] = []

          mediaRecorder.ondataavailable = e => {
            chunks.push(e.data)
          }

          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/mpeg' })
            const file = new File([blob], 'voice.mp3', {
              type: 'audio/mpeg',
            })
            setAudio(file)
            setIsRecording(false)
          }
        })
        .catch(err => {
          alert('음성 녹음 권한이 필요합니다.')
          console.error(`The following getUserMedia error occurred: ${err}`)
        })
    } else {
      alert('getUserMedia not supported on your browser!')
    }
  }

  function stop() {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop()
    }
  }

  return {
    isRecording,
    audio,
    audioRef,
    setAudio,
    stop,
    handleRecordClick,
    setIsRecording,
  }
}
