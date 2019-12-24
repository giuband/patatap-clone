import { random, times } from 'lodash'
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

const TOTAL_CIRCLES = 20
const MIN_CIRCLE_SIZE = 10
const MAX_CIRCLE_SIZE = 30

export default class Bokeh extends SceneInterface {
  circles: Array<{
    size: number
    direction: p5.Vector
  }>
  randomAngle: number

  constructor() {
    const renderDuration = 25
    super(renderDuration)
    const p = getP5()
    const maxDistance = Math.min(p.width, p.height) * 0.7
    this.circles = times(TOTAL_CIRCLES, () => ({
      size: random(MIN_CIRCLE_SIZE, MAX_CIRCLE_SIZE),
      direction: new p5.Vector(
        random(-maxDistance, maxDistance),
        random(maxDistance)
      ),
    }))
    this.randomAngle = p.radians(random(360))
  }

  draw() {
    const p = getP5()
    p.push()
    p.noStroke()
    const backgroundColor = getCurrentBackgroundColor()
    const [r, g, b] = colors[color[backgroundColor]]
    p.fill(r, g, b)
    p.translate(p.width / 2, p.height / 2)
    p.rotate(this.randomAngle)
    const animationProgress = (this.frame / this.renderDuration) ** (1 / 3)
    this.circles.forEach((circle) => {
      const { size, direction } = circle
      const positionX = direction.x * animationProgress
      const positionY = direction.y * animationProgress
      p.circle(positionX, positionY, size)
    })
    p.pop()
  }
}
