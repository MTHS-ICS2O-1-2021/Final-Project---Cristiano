/* global Phaser */

// Cristiano
// Final-Project---Cristiano
// June 7 2022
// Game Scene

class GameScene extends Phaser.Scene {
  // Constructor for varibles
  constructor() {
    super({ key: "gameScene" })

    this.player = null
    this.box = null
  }

  // Ran once initialized
  init(data) {
    this.cameras.main.setBackgroundColor("#000000")
  }

  // Ran while preloading
  preload() {
    console.log("Game Scene")

    this.load.image("playerImage", "assets/playerImage.png")
    this.load.image("boxImage", "assets/box.png")
  }

  // Creating varibles
  create(data) {
    this.player = this.physics.add.sprite(1920 / 2, 1080 / 2, "playerImage")
    this.box = this.physics.add.sprite(100, 100, "boxImage").setScale(2.0)

    // Collisions
    this.physics.add.collider(
      this.player,
      this.box,
      function (playerCollide, boxCollide) {
        playerCollide.x = 1920 / 2
        playerCollide.y = 1080 / 2
      }.bind(this)
    )
  }

  // Ran every milisecond or so
  update(time, delta) {
    // Arrow Keys
    const keyUpArrow = this.input.keyboard.addKey("UP")
    const keyDownArrow = this.input.keyboard.addKey("DOWN")
    const keyLeftArrow = this.input.keyboard.addKey("LEFT")
    const keyRightArrow = this.input.keyboard.addKey("RIGHT")
    // WASD
    const keyW = this.input.keyboard.addKey("W")
    const keyS = this.input.keyboard.addKey("S")
    const keyA = this.input.keyboard.addKey("A")
    const keyD = this.input.keyboard.addKey("D")

    if (keyUpArrow.isDown || keyW.isDown === true) {
      this.player.y -= 10
      if (this.player.y < 0) {
        this.player.y = 0
      }
    }

    if (keyDownArrow.isDown || keyS.isDown === true) {
      this.player.y += 10
      if (this.player.y > 1920) {
        this.player.y = 1920
      }
    }

    if (keyLeftArrow.isDown || keyA.isDown === true) {
      this.player.x -= 10
      if (this.player.x < 0) {
        this.player.x = 0
      }
    }

    if (keyRightArrow.isDown || keyD.isDown === true) {
      this.player.x += 10
      if (this.player.x > 1920) {
        this.player.x = 1920
      }
    }
  }
}

export default GameScene
