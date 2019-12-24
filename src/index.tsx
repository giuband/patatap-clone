import 'normalize.css'
import p5 from 'p5'
import { storeP5 } from './utils/p5context'
import initRecorder from './utils/record'
import Patatap from './Patatap'
import keyCodes from './utils/keyCodes'

const enableRecording = false

const sketch = (p: p5) => {
  let patatap: Patatap
  let recorder: ReturnType<typeof initRecorder>
  storeP5(p)

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    recorder = initRecorder()
    patatap = new Patatap(0, 'panna')
    p.noFill()
    p.frameCount = 60
  }

  p.draw = () => {
    patatap.draw()
    recorder.capture()
  }

  p.keyPressed = () => {
    if (enableRecording && p.keyCode === keyCodes.dot) {
      recorder.toggle()
    } else if (p.keyCode === keyCodes.N) {
      patatap.nextColor()
    } else {
      patatap.handleAddScene(p.keyCode)
    }
  }
}

new p5(sketch)
