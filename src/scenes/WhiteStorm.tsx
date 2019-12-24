import { getP5 } from '../utils/p5context'
import { ColorName, ThemeName } from '../types'
import { colors, getCurrentBackgroundColor } from '../utils/colors'
import SceneInterface from './SceneInterface'

const color: Record<ThemeName, ColorName> = {
  blue: 'white',
  panna: 'redPrint',
  darkPurple: 'lilla',
  lightGray: 'white',
  pink: 'white',
  orange: 'white',
}

export default class WhiteStorm extends SceneInterface {
  constructor() {
    const renderDuration = 25
    super(renderDuration)
  }

  draw() {
    const p = getP5()
    p.push()
    const backgroundColor = getCurrentBackgroundColor()
    const [r, g, b] = colors[color[backgroundColor]]
    p.background(r, g, b, 255 * p.noise(this.frame))
    p.pop()
  }
}
