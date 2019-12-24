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

const LINE_LENGTH = 5

export default class Spiral extends SceneInterface {
  angle: number
  circle: Array<{
    position: p5.Vector
    type: 'start' | 'end' | 'visible' | 'not-visible'
  }>

  constructor() {
    const renderDuration = 50
    super(renderDuration)
    const p = getP5()
    this.angle = 360 * Math.random()
    this.circle = []
    const radius = Math.min(p.width, p.height)
    let i = 0
    let wasVisible = false
    for (let angle = 0; angle < 720; angle += 1) {
      const v = p5.Vector.fromAngle(p.radians(angle - 135))
      v.mult((radius * (720 - angle)) / 720)
      const isVisible = !!(Math.trunc(i / LINE_LENGTH) % 2)
      const type =
        isVisible === wasVisible
          ? `${isVisible ? '' : 'not-'}visible`
          : isVisible
          ? 'start'
          : 'end'
      wasVisible = isVisible
      this.circle.push({
        position: v,
        type: type as 'start' | 'end' | 'visible' | 'not-visible',
      })
      i++
    }
  }

  draw() {
    const p = getP5()
    p.push()
    p.translate(p.width / 2, p.height / 2)
    p.rotate(p.radians(this.angle))
    p.beginShape()
    const [r, g, b] = colors[color[getCurrentBackgroundColor()]]
    const animationProgress = this.animationProgress ** (1 / 1.4)
    const circles = this.circle.slice(
      0,
      (this.circle.length - 1) * animationProgress
    )
    circles.forEach((circle) => {
      if (circle.type === 'end') {
        p.endShape()
      } else if (circle.type === 'start') {
        p.beginShape()
      }
      p.strokeWeight(10)
      p.stroke(r, g, b)
      p.curveVertex(
        circle.position.x * animationProgress,
        circle.position.y * animationProgress
      )
    })
    p.endShape()
    p.pop()
  }
}
