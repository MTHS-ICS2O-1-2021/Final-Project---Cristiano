/* global Phaser */

// Cristiano
// Final-Project---Cristiano
// June 7 2022
// Splash Scene

/**
* Phaser Scene
*/
class SplashScene extends Phaser.Scene {
  /**
   * Constructs varibles
   */
  constructor() {
    super({ key: "splashScene" })
  }

  /**
   * Initializes groups
   */
  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  /**
   * Preloads files
   */
  preload() {
    console.log("Splash Scene")
    this.load.image("splashSceneBackground", "assets/splashSceneImage.png")
  }

  /**
   * Creates varibles and functions
   */
  create(data) {
    this.splashSceneBackgroundImage = this.add.sprite(
      0,
      0,
      "splashSceneBackground"
    )
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
  }

  /**
   * Updates every milisecond
   */
  update(time, delta) {
    if (time > 3000) {
      this.scene.switch("menuScene")
    }
  }
}

export default SplashScene
