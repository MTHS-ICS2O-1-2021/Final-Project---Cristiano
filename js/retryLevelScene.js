/* global Phaser */

// Cristiano
// Final-Project---Cristiano
// June 7 2022
// Retry Level Scene

/**
 * Phaser Scene
 */
class RetryLevelScene extends Phaser.Scene {

  /**
   * Takes the player back to gameScene
   */
  onClick() {
    this.scene.start("gameScene", {
      level: this.currentLevel,
      timesLost: this.timesLost,
    })
  }

  /**
   * Constructs varibles
   */
  constructor() {
    super({ key: "retryLevelScene" })

    // Retry Elements
    this.retryButton = null
    this.retryBackground = null

    // Varible Elements
    this.currentLevel = null
    this.timesLost = null

    // Text Elements
    this.retryText = null
    this.retryTextStyle = {
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
    this.currentLevel = data.level
    this.timesLost = data.timesLost
  }

  /**
   * Preloads files
   */
  preload() {
    console.log("Retry Level Scene")

    this.load.image("retryButton", "assets/retryButton.png")
    this.load.image("retryBackground", "assets/retryBackground.png")
  }

  /**
   * Creates varibles and functions
   */
  create(data) {
    // Add Button and Background
    this.retryBackground = this.add.image(0, 0, "retryBackground")
    this.retryBackground.setOrigin(0, 0)
    this.retryButton = this.add
      .sprite(1920 / 2, 1080 / 2, "retryButton")
      .setScale(2.0)
    this.retryButton.setInteractive({ useHandCursor: true })
    this.retryButton.on("pointerdown", () => this.onClick())
    // Add Text
    this.retryText = this.add
      .text(
      1920 / 2,
      1080 / 2 - 200,
      "You lost!",
      this.retryTextStyle
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

export default RetryLevelScene
