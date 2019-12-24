import keyCodes from './utils/keyCodes'
import BlackStorm from './scenes/BlackStorm'
import Bokeh from './scenes/Bokeh'
import DisappearingCircle from './scenes/DisappearingCircle'
import DisappearingLine from './scenes/DisappearingLine'
import DisappearingMultipleLine from './scenes/DisappearingMultipleLine'
import Drops from './scenes/Drops'
import GrowingPolygon from './scenes/GrowingPolygon'
import Moon from './scenes/Moon'
import PacmanCircle from './scenes/PacmanCircle'
import PlayIcon from './scenes/PlayIcon'
import RisingCircle from './scenes/RisingCircle'
import ScreenCover from './scenes/ScreenCover'
import SpeedingRect from './scenes/SpeedingRect'
import Spiral from './scenes/Spiral'
import SquareIcon from './scenes/SquareIcon'
import WaveLine from './scenes/WaveLine'
import WhiteStorm from './scenes/WhiteStorm'

export type ThemeName =
  | 'panna'
  | 'darkPurple'
  | 'lightGray'
  | 'pink'
  | 'orange'
  | 'blue'

export type ColorName =
  | ThemeName
  | 'bluePrint'
  | 'lemon'
  | 'magenta'
  | 'dullOrange'
  | 'redPrint'
  | 'white'
  | 'brown'
  | 'aqua'
  | 'sand'
  | 'yellow'
  | 'lilla'
  | 'purple'
  | 'black'

export enum Scene {
  PacmanCircle,
  Drops,
  GrowingPolygon,
  WaveLine,
  Moon,
  RisingCircle,
  DisappearingCircle,
  DisappearingLine,
  DisappearingMultipleLine,
  Bokeh,
  Spiral,
  PlayIcon,
  SquareIcon,
  WhiteStorm,
  BlackStorm,
  ScreenCover,
  SpeedingRect,
}

export const SceneKey: Partial<Record<number, Scene>> = {
  [keyCodes.Q]: Scene.BlackStorm,
  [keyCodes.E]: Scene.Moon,
  [keyCodes.R]: Scene.DisappearingLine,
  [keyCodes.T]: Scene.DisappearingCircle,
  [keyCodes.Y]: Scene.Bokeh,
  [keyCodes.U]: Scene.PlayIcon,
  [keyCodes.I]: Scene.WaveLine,
  [keyCodes.O]: Scene.Drops,
  [keyCodes.P]: Scene.Spiral,
  [keyCodes.A]: Scene.WhiteStorm,
  [keyCodes.S]: Scene.ScreenCover,
  [keyCodes.D]: Scene.RisingCircle,
  [keyCodes.F]: Scene.DisappearingMultipleLine,
  [keyCodes.G]: Scene.PacmanCircle,
  [keyCodes.H]: Scene.SpeedingRect,
  [keyCodes.J]: Scene.SquareIcon,
  [keyCodes.K]: Scene.GrowingPolygon,
}

export const SceneClass = {
  [Scene.BlackStorm]: BlackStorm,
  [Scene.Moon]: Moon,
  [Scene.DisappearingLine]: DisappearingLine,
  [Scene.DisappearingCircle]: DisappearingCircle,
  [Scene.Bokeh]: Bokeh,
  [Scene.PlayIcon]: PlayIcon,
  [Scene.WaveLine]: WaveLine,
  [Scene.Drops]: Drops,
  [Scene.Spiral]: Spiral,
  [Scene.WhiteStorm]: WhiteStorm,
  [Scene.ScreenCover]: ScreenCover,
  [Scene.RisingCircle]: RisingCircle,
  [Scene.DisappearingMultipleLine]: DisappearingMultipleLine,
  [Scene.PacmanCircle]: PacmanCircle,
  [Scene.SpeedingRect]: SpeedingRect,
  [Scene.SquareIcon]: SquareIcon,
  [Scene.GrowingPolygon]: GrowingPolygon,
}
