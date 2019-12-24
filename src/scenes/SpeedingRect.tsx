import { random } from 'lodash'
import p5 from 'p5'
import { getP5 } from '../utils/p5context'
import { ThemeName, ColorName } from '../types'
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

export default class SpeedingRect extends SceneInterface {
  angle: number

  constructor() {
    const renderDuration = 10
    super(renderDuration)
    const p = getP5()
    this.angle = random(0, p.TWO_PI)
  }

  draw() {
    const p = getP5()
    const backgroundColor = getCurrentBackgroundColor()
    const [r, g, b] = colors[color[backgroundColor]]
    const vector = p5.Vector.fromAngle(this.angle)
    const scale = Math.max(p.width, p.height)
    vector.mult(scale * 0.6)
    p.push()
    p.stroke(r, g, b)
    p.strokeWeight(20)
    p.translate(p.width / 2, p.height / 2)
    const horizontalMovement = scale * p.cos(this.angle)
    const verticalMovement = scale * p.sin(this.angle)
    const translateX =
      -horizontalMovement / 2 + horizontalMovement * this.animationProgress
    const translateY =
      -verticalMovement / 2 + verticalMovement * this.animationProgress
    p.translate(translateX, translateY)
    p.beginShape()
    p.vertex(0, 0)
    p.vertex(vector.x, vector.y)
    p.endShape()
    p.pop()
  }
}
