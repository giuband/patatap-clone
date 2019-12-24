import { getP5 } from '../utils/p5context'
import { getCurrentBackgroundColor } from '../utils/colors'
import SceneInterface from './SceneInterface'

export default class BlackStorm extends SceneInterface {
  constructor() {
    const renderDuration = 25
    super(renderDuration)
  }

  draw() {
    const p = getP5()
    p.push()
    const backgroundColor = getCurrentBackgroundColor()
    const stormColor = ['purple', 'pink'].includes(backgroundColor) ? 255 : 0
    p.background(stormColor, 255 * p.noise(this.frame))
    p.pop()
  }
}
