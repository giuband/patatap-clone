import { Scene, SceneClass } from './types'
import SceneInterface from './scenes/SceneInterface'
import { getP5 } from './utils/p5context'

export default class ScenesRunner {
  currentScenes: Array<{
    scene: SceneInterface
    startingFrame: number
    name: Scene
  }>

  constructor() {
    this.currentScenes = []
  }

  addScene(scene: Scene) {
    const p = getP5()
    // avoid having the same scene twice
    this.removeExistingScene(scene)
    const addedScene = new SceneClass[scene]()
    this.currentScenes.push({
      scene: addedScene,
      startingFrame: p.frameCount,
      name: scene,
    })
    this.sortScenesByPriority()
  }

  sortScenesByPriority() {
    // we use the order in the enum Scene as priority (the first in the enum, the higher the priority)
    this.currentScenes = this.currentScenes.sort((a, b) => b.name - a.name)
  }

  removeExistingScene(scene: Scene) {
    this.currentScenes = this.currentScenes.filter(
      (curScene) => curScene.name !== scene
    )
  }

  removeOldScenes() {
    const p = getP5()
    const isOldScene = (scene: ScenesRunner['currentScenes'][0]) =>
      scene.startingFrame < p.frameCount - scene.scene.renderDuration
    this.currentScenes = this.currentScenes.filter(
      (scene) => !isOldScene(scene)
    )
  }

  draw() {
    this.removeOldScenes()
    this.currentScenes.forEach((scene) => {
      scene.scene.draw()
      scene.scene.updateFrameCount()
    })
  }
}
