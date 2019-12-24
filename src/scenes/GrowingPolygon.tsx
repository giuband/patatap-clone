import p5 from 'p5'
import { getP5 } from '../utils/p5context'
import { ColorName, ThemeName } from '../types'
import { colors, getCurrentBackgroundColor } from '../utils/colors'
import SceneInterface from './SceneInterface'

const MAX_SIDES = 8

const color: Record<ThemeName, ColorName> = {
  blue: 'lilla',
  panna: 'brown',
  darkPurple: 'aqua',
  lightGray: 'sand',
  pink: 'yellow',
  orange: 'pink',
}

const getSidesForProgress = (progress: number) => {
  return Math.min(progress * 20, MAX_SIDES) || 1
}

export default class GrowingPolygon extends SceneInterface {
  angle: number

  constructor() {
    const renderDuration = 80
    super(renderDuration)
    this.angle = 360 * Math.random()
  }

  draw() {
    const disappearingAnimation = 6
    const firstFrameDisappearing = this.renderDuration - disappearingAnimation
    const isDisappearing = this.frame >= firstFrameDisappearing
    const disappearingProgress =
      (this.frame - firstFrameDisappearing) / disappearingAnimation
    const p = getP5()
    p.push()
    const sides = getSidesForProgress(this.animationProgress)
    const circle = []
    const radius = (Math.min(p.width, p.height) / 2) * 0.25
    for (let angle = 0; angle <= 360; angle += 360 / sides) {
      const v = p5.Vector.fromAngle(p.radians(angle - 135))
      v.mult(radius)
      circle.push(v)
    }
    p.translate(p.width / 2, p.height / 2)
    p.rotate(p.radians(this.angle))
    if (isDisappearing) {
      p.scale(1 - disappearingProgress)
    }
    p.noStroke()
    const [r, g, b] = colors[color[getCurrentBackgroundColor()]]
    p.fill(r, g, b)
    p.beginShape()
    circle.forEach((v) => {
      p.vertex(v.x, v.y)
    })
    p.endShape()
    p.pop()
  }
}
