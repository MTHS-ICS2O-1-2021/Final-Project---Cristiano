/* global Phaser */

// Cristiano
// Final-Project---Cristiano
// June 7 2022
// Menu Scene

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "menuScene" })

    this.menuText = null
    this.menuTextStyle = {
      font: "200px Arial",
      fill: "#000000",
      align: "center" 
    }
    this.startButton = null
  }
  
  init(data) {
    this.cameras.main.setBackgroundColor("#b21d1d")
  }
  
  preload() {
    console.log("Menu Scene")

    this.load.image("startButton", "assets/startButton.png")
  }
  
  create(data) {
    this.menuText = this.add
      .text(1920 / 2, (1080 / 2) - 200, "Test", this.menuTextStyle)
      .setOrigin(0.5)
    this.startButton = this.add.sprite(1920 / 2, 1080 / 2, "startButton")
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on("pointerdown", () => this.onClick())
  }
  
  update(time, delta) {}

  // Click Function
  onClick() {
    this.scene.start("gameScene")
  }
}

export default MenuScene
