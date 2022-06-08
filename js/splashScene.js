/* global Phaser */

// Cristiano
// Final-Project---Cristiano
// June 7 2022
// Splash Scene

class SplashScene extends Phaser.Scene {
  // Constructor for varibles
  constructor() {
    super({ key: "splashScene" })
  }

  // Ran once initialized
  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  // Ran while preloading
  preload() {
    console.log("Splash Scene")
    this.load.image("splashSceneBackground", "assets/splashSceneImage.png")
  }

  // Creating varibles
  create(data) {
    this.splashSceneBackgroundImage = this.add.sprite(
      0,
      0,
      "splashSceneBackground"
    )
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
  }

  // Ran every milisecond or so
  update(time, delta) {
    if (time > 3000) {
      this.scene.switch("menuScene")
    }
  }
}

export default SplashScene
