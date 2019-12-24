import p5 from 'p5'
import { getP5 } from '../utils/p5context'
import { ColorName, ThemeName } from '../types'
import { colors, getCurrentBackgroundColor } from '../utils/colors'
import SceneInterface from './SceneInterface'

const color: Record<ThemeName, ColorName> = {
  blue: 'lemon',
  panna: 'bluePrint',
  darkPurple: 'magenta',
  lightGray: 'orange',
  pink: 'bluePrint',
  orange: 'dullOrange',
}

export default class Moon extends SceneInterface {
  angle: number
  circle: Array<p5.Vector>

  constructor() {
    const renderDuration = 50
    super(renderDuration)
    const p = getP5()
    this.angle = 360 * Math.random()
    const radius = (Math.min(p.width, p.height) / 2) * 0.4
    this.circle = []
    for (let angle = 0; angle < 360; angle += 9) {
      const v = p5.Vector.fromAngle(p.radians(angle - 135))
      v.mult(radius)
      this.circle.push(v)
    }
  }

  draw() {
    const p = getP5()
    p.push()
    p.translate(p.width / 2, p.height / 2)
    p.rotate(p.radians(this.angle))
    p.beginShape()
    p.noStroke()
    const [r, g, b] = colors[color[getCurrentBackgroundColor()]]
    p.fill(r, g, b)
    const steps = 10
    const stepDuration = Math.floor(this.renderDuration / steps)
    const firstStageEnd = stepDuration
    const lastStageBeginning = stepDuration * (steps - 1)
    const isGrowing = this.frame <= firstStageEnd
    const isDisappearing = this.frame >= lastStageBeginning
    this.circle.forEach((v) => {
      const x = v.x
      let y = v.y
      if (isGrowing && y < 0) {
        y = -y * ((stepDuration - 2 * this.frame) / stepDuration)
      } else if (isDisappearing && y > 0) {
        const framesSinceNewAnimation = this.frame - lastStageBeginning
        y = -y * (-1 + (2 * framesSinceNewAnimation) / stepDuration)
      }
      p.vertex(x, y)
    })
    p.endShape()
    p.pop()
  }
}
