export default class SceneInterface {
  frame = 0
  renderDuration: number
  /** Number between 0 and 1 indicating the percentage progress of the scene */
  animationProgress: number

  /**
   * Init a new animation
   * @param renderDuration The length in frames of the animation
   */
  constructor(renderDuration: number) {
    this.frame = 0
    this.renderDuration = renderDuration
    this.animationProgress = 0
  }

  updateFrameCount() {
    this.frame += 1
    this.animationProgress = this.frame / this.renderDuration
  }

  draw() {
    // will be overwritten by classes extending it
  }
}
