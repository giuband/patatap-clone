import CCapture from 'ccapture.js-npmfixed'

let isRecording = false

const FRAME_RATE = 60

export default function initRecorder() {
  const canvas = document.querySelector('.p5Canvas')!
  const capturer = new CCapture({
    format: 'png',
    name: 'sphere',
    framerate: FRAME_RATE,
    verbose: true,
  })

  return {
    capture() {
      if (isRecording) {
        capturer.capture(canvas)
      }
    },
    toggle() {
      if (isRecording) {
        console.log('stop recording')
        capturer.stop()
        capturer.save()
        isRecording = false
      } else {
        console.log('start recording')
        capturer.start()
        isRecording = true
      }
    },
  }
}
