/* global Phaser */

// Cristiano
// Final-Project---Cristiano
// June 7 2022
// Menu Scene

class MenuScene extends Phaser.Scene {
  // Constructor for varibles
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

  // Ran once initialized
  init(data) {
    this.cameras.main.setBackgroundColor("#b21d1d")
  }

  // Ran while preloading
  preload() {
    console.log("Menu Scene")

    this.load.image("startButton", "assets/startButton.png")
  }

  // Creating varibles
  create(data) {
    this.menuText = this.add
      .text(1920 / 2, 1080 / 2 - 200, "Test", this.menuTextStyle)
      .setOrigin(0.5)
    this.startButton = this.add.sprite(1920 / 2, 1080 / 2, "startButton")
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on("pointerdown", () => this.onClick())
  }

  // Ran every milisecond or so
  update(time, delta) {}

  // Takes player to the game scene
  onClick() {
    this.scene.start("gameScene")
  }
}

export default MenuScene
