/* global Phaser */

// Cristiano
// Final-Project---Cristiano
// June 7 2022
// Game Scene

/**
* Phaser Scene
*/
class GameScene extends Phaser.Scene {
  /**
   * Adds a dangerous box
   */
  addBox(boxX, boxY) {
    const box = this.physics.add.sprite(boxX, boxY, 'boxImage').setScale(2.0)
    box
    this.boxGroup.add(box)
  }

  /**
   * Constructs varibles
   */
  constructor() {
    super({ key: "gameScene" })

    this.player = null
  }

  /**
   * Initializes groups
   */
  init(data) {
    this.cameras.main.setBackgroundColor("#000000")
  }

  /**
   * Preloads files
   */
  preload() {
    console.log("Game Scene")

    this.load.image("playerImage", "assets/playerImage.png")
    this.load.image("boxImage", "assets/box.png")
  }

  /**
   * Creates varibles and functions
   */
  create(data) {
    this.player = this.physics.add.sprite(300, 50, "playerImage")
    this.boxGroup = this.add.group()
    this.addBox(100, 100)
    this.addBox(100, 300)
    this.addBox(100, 500)
    this.addBox(100, 700)
    this.addBox(500, 100)

    // Collisions
    this.physics.add.collider(
      this.player,
      this.boxGroup,
      function (playerCollide, boxCollide) {
        playerCollide.x = 300
        playerCollide.y = 50
      }.bind(this)
    )
  }

  /**
   * Updates every milisecond
   */
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
