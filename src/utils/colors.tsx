import { ColorName, ThemeName } from '../types'

let currentColor: ThemeName

export const colors: Record<ColorName, [number, number, number]> = {
  blue: [40, 50, 200],
  panna: [240, 240, 220],
  darkPurple: [50, 10, 60],
  pink: [245, 220, 240],
  orange: [230, 120, 40],
  lightGray: [180, 180, 180],
  white: [240, 240, 240],
  bluePrint: [31, 15, 106],
  lemon: [184, 213, 81],
  magenta: [217, 44, 165],
  dullOrange: [255, 152, 128],
  redPrint: [176, 76, 76],
  brown: [94, 45, 10],
  aqua: [40, 202, 202],
  sand: [140, 117, 81],
  yellow: [247, 226, 58],
  lilla: [200, 140, 240],
  purple: [170, 0, 170],
  black: [20, 20, 20],
}

export const getCurrentBackgroundColor = () => currentColor

export const updateBackgroundColor = (newColor: ThemeName) => {
  currentColor = newColor
}
