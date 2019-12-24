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

export default class RisingCircle extends SceneInterface {
  direction: 1 | -1
  side: 1 | -1

  constructor() {
    const renderDuration = 25
    super(renderDuration)
    this.direction = Math.random() > 0.5 ? 1 : -1
    this.side = Math.random() > 0.5 ? 1 : -1
  }

  draw() {
    const p = getP5()
    p.noStroke()
    const backgroundColor = getCurrentBackgroundColor()
    const [r, g, b] = colors[color[backgroundColor]]
    const steps = 5
    const stepDuration = Math.floor(this.renderDuration / steps)
    const firstStageEnd = stepDuration
    const lastStageBeginning = stepDuration * (steps - 1)
    const isGrowing = this.frame <= firstStageEnd
    const isDisappearing = this.frame >= lastStageBeginning
    p.push()
    p.fill(r, g, b)
    p.translate(p.width / 2, p.height / 2)
    if (this.direction < 0) {
      p.rotate(p.PI)
    }
    p.translate(this.side > 0 ? p.width / 4 : -p.width / 4, 0)
    if (isGrowing) {
      const animationProgress = this.frame / stepDuration ** 1.5
      const initialY = this.direction > 0 ? -p.height / 2 : p.height / 2
      const translation =
        initialY + this.direction * (p.height / 2) * animationProgress
      p.translate(0, translation)
    }
    if (isDisappearing) {
      p.scale((stepDuration - (this.frame - lastStageBeginning)) / stepDuration)
    }
    p.circle(0, 0, Math.min(p.width, p.height) / 3)
    p.pop()
  }
}
