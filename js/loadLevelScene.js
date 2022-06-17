/* global Phaser */

// Cristiano
// Final-Project---Cristiano
// June 7 2022
// Load Level Scene

/**
 * Phaser Scene
 */
class LoadLevelScene extends Phaser.Scene {

  /**
   * Takes the player to gameScene
   */
  onClick() {
    this.scene.start("gameScene", {
      level: this.nextLevel,
      timesLost: 0,
    })
  }

  /**
   * Constructs varibles
   */
  constructor() {
    super({ key: "loadLevelScene" })

    // Button Element
    this.startButton = null

    // Varible Elements
    this.nextLevel = null
    this.timeCompleted = null

    // Text Elements
    this.timeText = null
    this.timeTextStyle = {
      font: "75px Arial",
      fill: "#ffffffff",
      align: "center",
    }
  }

  /**
   * Initializes groups
   */
  init(data) {
    this.cameras.main.setBackgroundColor("#000000")
    this.nextLevel = data.level
    this.timeCompleted = (data.time / 1000).toFixed(2)
  }

  /**
   * Preloads files
   */
  preload() {
    console.log("Load Level Scene")

    this.load.image("startButton", "assets/startButton.png")
  }

  /**
   * Creates varibles and functions
   */
  create(data) {
    // Add Button
    this.startButton = this.add.sprite(1920 / 2, 1080 / 2, "startButton")
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on("pointerdown", () => this.onClick())
    // Add Text
    this.timeText = this.add
      .text(
      1920 / 2,
      1080 / 2 - 200,
      "You completed Level " + (this.nextLevel - 1) + " in " + this.timeCompleted + " seconds!",
      this.timeTextStyle
    )
      .setOrigin(0.5)
  }

  /**
   * Updates every milisecond
   */
  update(time, delta) {
    const keyEnter = this.input.keyboard.addKey("ENTER")

    if (keyEnter.isDown === true) {
      this.onClick()
    }
  }
}

export default LoadLevelScene
