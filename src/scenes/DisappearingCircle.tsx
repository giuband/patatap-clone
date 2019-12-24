import p5 from 'p5'
import { getP5 } from '../utils/p5context'
import { ColorName, ThemeName } from '../types'
import { colors, getCurrentBackgroundColor } from '../utils/colors'
import SceneInterface from './SceneInterface'

const color: Record<ThemeName, ColorName> = {
  blue: 'lilla',
  panna: 'brown',
  darkPurple: 'aqua',
  lightGray: 'sand',
  pink: 'yellow',
  orange: 'pink',
}

export default class DisappearingCircle extends SceneInterface {
  angle: number
  circle: Array<p5.Vector>

  constructor() {
    const renderDuration = 50
    super(renderDuration)
    this.angle = 360 * Math.random()
    const p = getP5()
    this.circle = []
    const radius = (Math.min(p.width, p.height) / 2) * 0.4
    for (let angle = 0; angle <= 369; angle += 9) {
      // Note we are not starting from 0 in order to match the
      // path of a circle.
      const v = p5.Vector.fromAngle(p.radians(angle - 135))
      v.mult(radius)
      this.circle.push(v)
    }
  }

  draw() {
    const p = getP5()
    p.push()
    const animationDuration = this.renderDuration / 2
    const isGrowing = this.frame < this.renderDuration / 2
    const isStable = this.frame <= this.renderDuration / 2 + 3
    let visibleCircle = this.circle
    if (isGrowing) {
      const lastVector = visibleCircle.length * (this.frame / animationDuration)
      visibleCircle = visibleCircle.slice(0, lastVector)
    } else if (!isStable) {
      const firstVector =
        visibleCircle.length *
        ((this.frame - animationDuration) / animationDuration)
      visibleCircle = visibleCircle.slice(firstVector)
    }
    p.translate(p.width / 2, p.height / 2)
    p.rotate(p.radians(this.angle))
    p.beginShape()
    p.strokeWeight(30)
    p.strokeCap(p.SQUARE)
    const [r, g, b] = colors[color[getCurrentBackgroundColor()]]
    p.stroke(r, g, b)
    visibleCircle.forEach((v) => {
      p.vertex(v.x, v.y)
    })
    p.endShape()
    p.pop()
  }
}
