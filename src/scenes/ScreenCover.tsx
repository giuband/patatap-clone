import { getP5 } from '../utils/p5context'
import { ColorName, ThemeName } from '../types'
import { colors, getCurrentBackgroundColor } from '../utils/colors'
import SceneInterface from './SceneInterface'

const color: Record<ThemeName, ColorName> = {
  blue: 'lilla',
  panna: 'orange',
  darkPurple: 'aqua',
  lightGray: 'sand',
  pink: 'yellow',
  orange: 'pink',
}

export default class ScreenCover extends SceneInterface {
  direction: 1 | -1

  constructor() {
    const renderDuration = 50
    super(renderDuration)
    this.direction = Math.random() > 0.5 ? 1 : -1
  }

  draw() {
    const p = getP5()
    const steps = 8
    const stepDuration = Math.floor(this.renderDuration / steps)
    const firstStageEnd = stepDuration
    const lastStageBeginning = stepDuration * (steps - 1)
    const isGrowing = this.frame <= firstStageEnd
    const isDisappearing = this.frame >= lastStageBeginning
    const backgroundColor = getCurrentBackgroundColor()
    const [r, g, b] = colors[color[backgroundColor]]
    p.push()
    p.noStroke()
    p.fill(r, g, b)
    p.translate(p.width / 2, p.height / 2)
    if (this.direction < 0) {
      p.rotate(p.PI)
    }
    if (isGrowing) {
      p.rect(
        -p.width / 2,
        -p.height / 2,
        p.width,
        p.height * (this.frame / stepDuration) ** (1 / 2)
      )
    } else if (isDisappearing) {
      const framesSinceNewAnimation = this.frame - lastStageBeginning
      p.rect(
        -p.width / 2,
        -p.height / 2 +
          p.height * (framesSinceNewAnimation / stepDuration) ** (1 / 2),
        p.width,
        p.height
      )
    } else {
      p.rect(-p.width / 2, -p.height / 2, p.width, p.height)
    }
    p.pop()
  }
}
