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
    const box = this.physics.add.sprite(boxX, boxY, "boxImage").setScale(2.0)
    box

    this.boxGroup.add(box)
  }

  /**
   * Adds dangerous boxes in a line on the y axis
   */
  addBoxLoopY(boxX, numberOfBoxes, skippedBoxes) {
    var yLimit = 100 + numberOfBoxes * 200

    for (let count = 100; count != yLimit; count = count + 200) {
      if (skippedBoxes > 0) {
        skippedBoxes = skippedBoxes - 1
      } else {
        this.addBox(boxX, count)
      }
    }
  }

  /**
   * Adds dangerous boxes in a line on the x axis
   */
  addBoxLoopX(boxY, numberOfBoxes, skippedBoxes) {
    var xLimit = 100 + numberOfBoxes * 200

    for (let count = 100; count != xLimit; count = count + 200) {
      if (skippedBoxes > 0) {
        skippedBoxes = skippedBoxes - 1
      } else {
        this.addBox(count, boxY)
      }
    }
  }

  /**
   * Constructs varibles
   */
  constructor() {
    super({ key: "gameScene" })

    this.player = null
    this.timesLost = null
    this.bottomGui = null
    this.sideGui = null
    this.loseText = null
    this.loseTextStyle = {
      font: "50px Arial",
      fill: "#ffffff",
      align: "center",
    }
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
    this.load.image("bottomGui", "assets/bottomGUI.png")
    this.load.image("sideGui", "assets/sideGUI.png")
  }

  /**
   * Creates varibles and functions
   */
  create(data) {
    // Set times lost
    this.timesLost = 0
    // Add Player
    this.player = this.physics.add.sprite(100, 100, "playerImage")
    // Generate level one
    this.boxGroup = this.add.group()
    this.addBoxLoopY(300, 4)
    this.addBoxLoopX(700, 5, 2)
    this.addBoxLoopY(1100, 4)
    this.addBoxLoopY(1500, 5, 1)
    this.addBoxLoopY(1700, 5)
    // Add Gui
    this.bottomGui = this.physics.add.sprite(0, 1197, "bottomGui").setScale(4.0)
    this.sideBui = this.physics.add.sprite(1965, 0, "sideGui").setScale(3.0)
    this.loseText = this.add.text(
      20,
      1015,
      "Times lost: " + this.timesLost,
      this.loseTextStyle
    )
    // Set collision function
    this.physics.add.collider(
      this.player,
      this.boxGroup,
      function (playerCollide, boxCollide) {
        this.timesLost++
        this.loseText.text = "Times lost: " + this.timesLost
        playerCollide.x = 100
        playerCollide.y = 100
      }.bind(this)
    )
  }

  /**
   * Updates every milisecond
   */
  update(time, delta) {
    // Movement
    const keyUpArrow = this.input.keyboard.addKey("UP")
    const keyDownArrow = this.input.keyboard.addKey("DOWN")
    const keyLeftArrow = this.input.keyboard.addKey("LEFT")
    const keyRightArrow = this.input.keyboard.addKey("RIGHT")
    const keyW = this.input.keyboard.addKey("W")
    const keyS = this.input.keyboard.addKey("S")
    const keyA = this.input.keyboard.addKey("A")
    const keyD = this.input.keyboard.addKey("D")

    if (keyUpArrow.isDown || keyW.isDown === true) {
      this.player.y -= 10
      if (this.player.y < 50) {
        this.player.y = 50
      }
    }

    if (keyDownArrow.isDown || keyS.isDown === true) {
      this.player.y += 10
      if (this.player.y > 950) {
        this.player.y = 950
      }
    }

    if (keyLeftArrow.isDown || keyA.isDown === true) {
      this.player.x -= 10
      if (this.player.x < 50) {
        this.player.x = 50
      }
    }

    if (keyRightArrow.isDown || keyD.isDown === true) {
      this.player.x += 10
      if (this.player.x > 1870) {
        this.player.x = 1870
      }
    }
  }
}

export default GameScene
