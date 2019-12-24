import p5 from 'p5'

let p: p5

export const storeP5 = (newP: p5) => {
  p = newP
}

export const getP5 = () => p
