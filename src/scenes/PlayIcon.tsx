import { getP5 } from '../utils/p5context'
import { getCurrentBackgroundColor } from '../utils/colors'
import SceneInterface from './SceneInterface'

export default class PlayIcon extends SceneInterface {
  constructor() {
    const renderDuration = 25
    super(renderDuration)
  }

  addCircle(x: number, y: number, color: number, opacity: number) {
    const p = getP5()
    p.push()
    p.noStroke()
    p.fill(color, opacity)
    p.circle(x, y, 20)
    p.pop()
  }

  addVertex(vertexIndex: 1 | 2, color: number, opacity: number) {
    const p = getP5()
    const maxScale = p.width * 1.5
    const animationProgress = this.frame / this.renderDuration
    const scale = animationProgress * maxScale
    let positionX = 0
    let positionY = 0
    if (vertexIndex === 1) {
      positionX = scale * p.sin(p.radians(120))
      positionY = scale * p.cos(p.radians(120))
    } else {
      positionX = scale * p.sin(p.PI)
      positionY = scale * p.cos(p.PI)
    }
    p.vertex(positionX, positionY)
    this.addCircle(positionX, positionY, color, opacity)
  }

  draw() {
    const p = getP5()
    const animationProgress = this.frame / this.renderDuration
    let opacity = 255
    if (animationProgress < 0.1) {
      opacity = 0
    } else if (animationProgress < 0.2) {
      opacity = p.map(animationProgress, 0.1, 0.2, 0, 255)
    }
    const backgroundColor = getCurrentBackgroundColor()
    const color = ['purple', 'pink'].includes(backgroundColor) ? 255 : 0
    p.push()
    p.stroke(color, opacity)
    p.translate(p.width / 2, p.height / 2)
    p.translate(p.width * 0.8 * animationProgress, 0)
    p.rotate(p.radians(-120))
    p.beginShape()
    this.addCircle(0, 0, color, opacity)
    p.vertex(0, 0)
    this.addVertex(1, color, opacity)
    this.addVertex(2, color, opacity)
    p.vertex(0, 0)
    p.endShape()
    p.pop()
  }
}
