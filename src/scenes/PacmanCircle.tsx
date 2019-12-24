import p5 from 'p5'
import { getP5 } from '../utils/p5context'
import { ColorName, ThemeName } from '../types'
import { colors, getCurrentBackgroundColor } from '../utils/colors'
import SceneInterface from './SceneInterface'

const color: Record<ThemeName, ColorName> = {
  blue: 'black',
  panna: 'black',
  darkPurple: 'white',
  lightGray: 'black',
  pink: 'white',
  orange: 'black',
}

export default class PacmanCircle extends SceneInterface {
  angle: number
  circle: Array<p5.Vector>

  constructor() {
    const renderDuration = 50
    super(renderDuration)
    this.angle = 360 * Math.random()
    const p = getP5()
    this.circle = []
    const radius = (Math.min(p.width, p.height) / 2) * 0.4
    for (let angle = 0; angle < 360; angle += 9) {
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
      const animationProgress = (this.frame / animationDuration) ** 2
      const lastVector = visibleCircle.length * animationProgress
      visibleCircle = visibleCircle.slice(0, lastVector)
    } else if (!isStable) {
      const framesSinceAnimation = this.frame - (this.renderDuration / 2 + 3)
      const animationProgress =
        ((this.frame - animationDuration) / animationDuration) **
        (1 - framesSinceAnimation / animationDuration)
      const firstVector = visibleCircle.length * animationProgress
      visibleCircle = visibleCircle.slice(firstVector)
    }
    p.translate(p.width / 2, p.height / 2)
    p.rotate(p.radians(this.angle))
    const [r, g, b] = colors[color[getCurrentBackgroundColor()]]
    p.fill(r, g, b)
    visibleCircle.forEach((v) => {
      p.circle(v.x, v.y, 6)
    })
    p.pop()
  }
}
