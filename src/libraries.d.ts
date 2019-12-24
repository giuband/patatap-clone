declare module 'ccapture.js-npmfixed' {
  export default class CCapture {
    constructor({ format: string, framerate: number, verbose: boolean, name: string })

    save(name?: string): void
    stop(): void
    start(): void
    capture(element: Element): void
  }
}
