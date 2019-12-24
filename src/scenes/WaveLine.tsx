import { random } from 'lodash'
import p5 from 'p5'
import { getP5 } from '../utils/p5context'
import { ColorName, ThemeName } from '../types'
import { colors, getCurrentBackgroundColor } from '../utils/colors'
import SceneInterface from './SceneInterface'

const color: Record<ThemeName, ColorName> = {
  blue: 'aqua',
  panna: 'yellow',
  darkPurple: 'lilla',
  lightGray: 'pink',
  pink: 'magenta',
  orange: 'sand',
}

export default class WaveLine extends SceneInterface {
  lineWidth: number
  lineHeight: number
  direction: 1 | -1
  points: Array<p5.Vector>

  constructor() {
    const renderDuration = 15
    super(renderDuration)
    const p = getP5()
    this.lineWidth = p.width / 2
    this.lineHeight = p.height / 2
    this.direction = Math.random() > 0.5 ? 1 : -1
    const cycles = 2 * random(1, 5)
    this.points = []
    for (let x = 0; x < this.lineWidth; x += 2) {
      const angle = p.map(x, 0, this.lineWidth, 0, p.PI * cycles)
      const y = this.lineHeight * ((1 + p.cos(angle)) / 2)
      this.points.push(new p5.Vector(x * this.direction, y))
    }
  }

  draw() {
    const p = getP5()
    const backgroundColor = getCurrentBackgroundColor()
    const [r, g, b] = colors[color[backgroundColor]]
    p.push()
    p.stroke(r, g, b)
    p.strokeWeight(20)
    p.strokeCap(p.PROJECT)
    p.beginShape()
    p.translate(p.width / 2, p.height / 2)
    p.translate((-this.direction * this.lineWidth) / 2, -this.lineHeight / 2)
    const finalPointIndex = Math.ceil(
      this.animationProgress * this.points.length
    )
    const points = this.points.slice(0, finalPointIndex)
    points.forEach((point) => {
      p.curveVertex(point.x, point.y)
    })
    p.endShape()
    p.pop()
  }
}
