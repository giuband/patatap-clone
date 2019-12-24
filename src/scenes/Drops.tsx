import { random, times } from 'lodash'
import p5 from 'p5'
import { getP5 } from '../utils/p5context'
import { ColorName, ThemeName } from '../types'
import { colors, getCurrentBackgroundColor } from '../utils/colors'
import SceneInterface from './SceneInterface'

const dropColors: Record<ThemeName, Array<ColorName>> = {
  blue: ['white', 'purple', 'magenta', 'lemon', 'yellow', 'black', 'pink'],
  panna: ['redPrint', 'bluePrint', 'sand', 'black', 'yellow'],
  darkPurple: ['white', 'magenta', 'lilla', 'aqua', 'white', 'pink'],
  lightGray: ['white', 'orange', 'pink', 'dullOrange', 'lilla'],
  pink: ['white', 'blue', 'yellow', 'pink', 'purple'],
  orange: ['white', 'sand', 'dullOrange', 'sand', 'black', 'pink'],
}

const TOTAL_CIRCLES = 20
const MIN_CIRCLE_SIZE = 10
const MAX_CIRCLE_SIZE = 40
const CIRCLE_LIFESPAN = 10

export default class Drops extends SceneInterface {
  circles: Array<{
    size: number
    position: p5.Vector
    color: [number, number, number]
    initialFrame: number
  }>
  randomAngle: number

  constructor() {
    const renderDuration = 25
    super(renderDuration)
    const p = getP5()
    const maxDistance = p.width * 0.3
    const availableColors = dropColors[getCurrentBackgroundColor()]
    this.circles = times(TOTAL_CIRCLES, () => ({
      size: random(MIN_CIRCLE_SIZE, MAX_CIRCLE_SIZE),
      position: new p5.Vector(
        random(-maxDistance, maxDistance),
        random(-maxDistance, maxDistance)
      ),
      color: colors[availableColors[random(availableColors.length - 1)]],
      initialFrame: random(renderDuration - CIRCLE_LIFESPAN),
    }))
    this.randomAngle = p.radians(random(360))
  }

  draw() {
    const p = getP5()
    p.push()
    p.translate(p.width / 2, p.height / 2)
    p.rotate(this.randomAngle)
    const visibleCircles = this.circles.filter(
      (circle) =>
        this.frame < circle.initialFrame + CIRCLE_LIFESPAN &&
        this.frame >= circle.initialFrame
    )
    visibleCircles.forEach((circle) => {
      const { size, position, color, initialFrame } = circle
      const [r, g, b] = color
      p.stroke(r, g, b)
      p.strokeWeight(
        (size * (CIRCLE_LIFESPAN - (this.frame - initialFrame))) /
          CIRCLE_LIFESPAN
      )
      p.circle(position.x, position.y, size)
    })
    p.pop()
  }
}
