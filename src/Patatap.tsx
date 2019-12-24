import { getP5 } from './utils/p5context'
import ScenesRunner from './ScenesRunner'
import { Scene, SceneKey, ThemeName } from './types'
import { colors, updateBackgroundColor } from './utils/colors'

export default class Patatap {
  screen: number
  background: ThemeName
  colors: Array<ThemeName> = [
    'blue',
    'panna',
    'darkPurple',
    'lightGray',
    'pink',
    'orange',
  ]
  runner: ScenesRunner

  constructor(screen: number, background: ThemeName) {
    this.screen = screen
    this.background = background
    this.runner = new ScenesRunner()
    updateBackgroundColor(background)
  }

  nextColor() {
    const currentColorIndex = this.colors.indexOf(this.background)
    const nextColorIndex =
      currentColorIndex === this.colors.length - 1 ? 0 : currentColorIndex + 1
    const newColor = this.colors[nextColorIndex]
    this.background = newColor
    updateBackgroundColor(newColor)
  }

  handleAddScene = (keyCode: number) => {
    const scene = SceneKey[keyCode] ?? Scene.BlackStorm
    this.runner.addScene(scene)
  }

  draw() {
    const p = getP5()
    const [red, green, blue] = colors[this.background]
    p.background(red, green, blue)
    this.runner.draw()
  }
}
