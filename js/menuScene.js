/* global Phaser */

// Cristiano
// Final-Project---Cristiano
// June 7 2022
// Menu Scene

/**
 * Phaser Scene
 */
class MenuScene extends Phaser.Scene {
  /**
   * Takes the player to gameScene's first level
   */
  onClick() {
    this.scene.start("gameScene", { level: 1 })
  }

  /**
   * Constructs varibles
   */
  constructor() {
    super({ key: "menuScene" })

    this.menuText = null
    this.menuTextStyle = {
      font: "200px Arial",
      fill: "#000000",
      align: "center",
    }
    this.startButton = null
  }

  /**
   * Initializes groups
   */
  init(data) {
    this.cameras.main.setBackgroundColor("#b21d1d")
  }

  /**
   * Preloads files
   */
  preload() {
    console.log("Menu Scene")

    this.load.image("startButton", "assets/startButton.png")
  }

  /**
   * Creates varibles and functions
   */
  create(data) {
    this.menuText = this.add
      .text(1920 / 2, 1080 / 2 - 200, "Test", this.menuTextStyle)
      .setOrigin(0.5)
    this.startButton = this.add.sprite(1920 / 2, 1080 / 2, "startButton")
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on("pointerdown", () => this.onClick())
  }

  /**
   * Updates every milisecond
   */
  update(time, delta) {}
}

export default MenuScene
