import p5 from 'p5'
import { getP5 } from '../utils/p5context'
import { ColorName, ThemeName } from '../types'
import { colors, getCurrentBackgroundColor } from '../utils/colors'
import SceneInterface from './SceneInterface'

const color: Record<ThemeName, ColorName> = {
  blue: 'white',
  panna: 'redPrint',
  darkPurple: 'white',
  lightGray: 'white',
  pink: 'white',
  orange: 'white',
}

export default class DisappearingMultipleLine extends SceneInterface {
  direction: 1 | -1

  constructor() {
    const renderDuration = 20
    super(renderDuration)
    this.direction = Math.random() > 0.5 ? 1 : -1
  }

  draw() {
    const p = getP5()
    const width = p.width / 3
    const height = p.height / 20
    const verticalGap = height / 3
    const rects: Array<{ rect: Array<p5.Vector>; translateY: number }> = []
    p.push()
    p.translate(p.width / 2, p.height / 2)
    for (let j = 0; j < 5; j++) {
      const relativeIndex = j - 2 // central rect at i=2
      const rect: Array<p5.Vector> = []
      rect.push(new p5.Vector(-width, height))
      rect.push(new p5.Vector(width, height))
      rect.push(new p5.Vector(width, -height))
      rect.push(new p5.Vector(-width, -height))
      const translateY = relativeIndex * (2 * height + verticalGap)
      rects.push({ rect, translateY })
    }
    const [r, g, b] = colors[color[getCurrentBackgroundColor()]]
    p.fill(r, g, b)
    p.noStroke()
    p.beginShape()
    rects.forEach(({ rect, translateY }) =>
      rect.forEach((v) => {
        let x = v.x
        const shouldAnimateX = this.direction === 1 ? x < 0 : x > 0
        if (shouldAnimateX) {
          const totalDistance = width * 2
          const speed = (this.frame / this.renderDuration) ** 3
          const traveledDistance =
            speed * (this.frame / this.renderDuration) * totalDistance
          if (this.direction === 1) {
            x += traveledDistance
            x = Math.min(x, width)
          } else {
            x -= traveledDistance
            x = Math.max(x, -width)
          }
        }
        const y = v.y
        p.vertex(x, y + translateY)
      })
    )
    p.endShape()
    p.pop()
  }
}
