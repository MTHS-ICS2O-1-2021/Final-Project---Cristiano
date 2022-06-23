/* global Phaser */

// Cristiano
// Final-Project---Cristiano
// June 7 2022
// Beat Game Scene

/**
 * Phaser Scene
 */
class BeatGameScene extends Phaser.Scene {
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
    super({ key: "beatGameScene" })

    // Button Element
    this.startButton = null

    // Varible Elements
    this.timeCompleted = null

    // GUI Element
    this.background = null

    // Text Elements
    this.winText = null
    this.replayText = null
    this.timeText = null
    this.textStyle = {
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

    this.timeCompleted = (data.time / 1000).toFixed(2)
  }

  /**
   * Preloads files
   */
  preload() {
    console.log("Beat Game Scene")

    this.load.image("beatgamebackground", "assets/beatGameBackground.png")
  }

  /**
   * Creates varibles and functions
   */
  create(data) {
    // Add Text
    this.beatgamebackground = this.add.image(0, 0, "beatgamebackground")
    this.beatgamebackground.setOrigin(0, 0)
    this.winText = this.add
      .text(1920 / 2, 1080 / 2 - 200, "You win!", this.textStyle)
      .setOrigin(0.5)
    this.replayText = this.add
      .text(
        1920 / 2,
        1080 / 2 + 200,
        "Refresh the page to try again.",
        this.textStyle
      )
      .setOrigin(0.5)
    this.timeText = this.add
      .text(
        1920 / 2,
        1080 / 2,
        "You beat the game in " + this.timeCompleted + " seconds!",
        this.textStyle
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

export default BeatGameScene
