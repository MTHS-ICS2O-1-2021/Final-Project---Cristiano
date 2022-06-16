/* global Phaser */

// Cristiano
// Final-Project---Cristiano
// June 7 2022
// Game Scene

var timesLost = 0
var powerUpActive = false
var greenKeysHeld = 0
var redKeysHeld = 0

/**
 * Phaser Scene
 */
class GameScene extends Phaser.Scene {

  /**
   * Adds the player
   */
  addPlayer(playerX, playerY) {
    playerX = 100 + playerX * 200
    playerY = 100 + playerY * 200

    this.playerGroup = this.add.group()
    this.player = this.physics.add.sprite(playerX, playerY, "playerImage")
    this.playerGroup.add(this.player)
  }

  /**
   * Reloads the current level
   */
  retryLevel(playerX, playerY) {
    powerUpActive = false
    greenKeysHeld = 0
    redKeysHeld = 0
    this.scene.start("gameScene", { level: this.currentLevel })
  }

  /**
   * Adds the retry button which adds the player when clicked
   */
  addRetryButton() {
    this.retryBackground = this.add.image(0, 0, "retryBackground")
    this.retryBackground.setOrigin(0, 0)
    this.retryButton = this.add
            .sprite(1920 / 2, 1080 / 2, "retryButton")
            .setScale(2.0)
    this.retryButton.setInteractive({ useHandCursor: true })
    this.retryButton.on("pointerdown", () => this.retryLevel())
  }

  /**
   * Adds a box depending on its type
   */
  addBox(boxX, boxY, boxType) {
    if (boxType == 1) {
      boxX = 100 + boxX * 200
      boxY = 100 + boxY * 200
      const box = this.physics.add
        .sprite(boxX, boxY, "steelBoxImage")
        .setScale(2.0)

      this.steelBoxGroup.add(box)
    } else {
      boxX = 100 + boxX * 200
      boxY = 100 + boxY * 200
      const box = this.physics.add.sprite(boxX, boxY, "boxImage").setScale(2.0)

      this.boxGroup.add(box)
    }
  }

  /**
   * Adds boxes in a line along the y axis
   */
  addBoxLoopY(boxX, numberOfBoxes, skippedBoxes, boxType) {
    for (let count = 0; count != numberOfBoxes; count++) {
      if (skippedBoxes > 0) {
        skippedBoxes = skippedBoxes - 1
      } else {
        this.addBox(boxX, count, boxType)
      }
    }
  }

  /**
   * Adds boxes in a line along the x axis
   */
  addBoxLoopX(boxY, numberOfBoxes, skippedBoxes, boxType) {
    for (let count = 0; count != numberOfBoxes; count++) {
      if (skippedBoxes > 0) {
        skippedBoxes = skippedBoxes - 1
      } else {
        this.addBox(count, boxY, boxType)
      }
    }
  }

  /**
   * Adds a green key door that opens with a green key
   */
  addGreenKeyDoor(keyDoorX, keyDoorY) {
    keyDoorX = 100 + keyDoorX * 200
    keyDoorY = 100 + keyDoorY * 200
    const keyDoor = this.physics.add
      .sprite(keyDoorX, keyDoorY, "keyDoorImage")
      .setScale(2.0)

    this.greenKeyDoorGroup.add(keyDoor)
  }

  /**
   * Adds a red key door that opens with a red key
   */
  addRedKeyDoor(keyDoorX, keyDoorY) {
    keyDoorX = 100 + keyDoorX * 200
    keyDoorY = 100 + keyDoorY * 200
    const keyDoor = this.physics.add
      .sprite(keyDoorX, keyDoorY, "redKeyDoorImage")
      .setScale(2.0)

    this.redKeyDoorGroup.add(keyDoor)
  }

  /**
   * Adds a green key that opens a green key door
   */
  addGreenKey(keyX, keyY) {
    keyX = 100 + keyX * 200
    keyY = 100 + keyY * 200
    const key = this.physics.add.sprite(keyX, keyY, "keyImage")

    this.greenKeyGroup.add(key)
  }

  /**
   * Adds a red key that opens a red key door
   */
  addRedKey(keyX, keyY) {
    keyX = 100 + keyX * 200
    keyY = 100 + keyY * 200
    const key = this.physics.add.sprite(keyX, keyY, "redKeyImage")

    this.redKeyGroup.add(key)
  }

  /**
   * Adds a red key that opens a red key door
   */
  addPowerUp(powerUpX, powerUpY) {
    powerUpX = 100 + powerUpX * 200
    powerUpY = 100 + powerUpY * 200
    const powerUp = this.physics.add.sprite(powerUpX, powerUpY, "powerUpImage")

    this.powerUpGroup.add(powerUp)
  }

  /**
   * Adds the goal post that brings the player to the next level
   */
  addGoal(goalX, goalY) {
    goalX = 100 + goalX * 200
    goalY = 100 + goalY * 200
    const goal = this.physics.add.sprite(goalX, goalY, "goalImage")

    this.goalGroup.add(goal)
  }

  /**
   * Loads in Level 1
   */
  addLevel1() {
    // Add Player
    this.addPlayer(0, 0)
    // Add Level
    this.boxGroup = this.add.group()
    this.addBoxLoopY(1, 4)
    this.addBoxLoopX(3, 5, 2)
    this.addBoxLoopY(5, 4)
    this.addBoxLoopY(7, 5, 1)
    this.addBoxLoopY(8, 5, 1)
    this.goalGroup = this.add.group()
    this.addGoal(8, 0)
    // Add Gui
    this.bottomGui = this.physics.add.sprite(0, 1197, "bottomGui").setScale(4.0)
    this.sideBui = this.physics.add.sprite(1965, 0, "sideGui").setScale(3.0)
    // Add Text
    this.loseText = this.add.text(
      20,
      1015,
      "Times lost: " + timesLost,
      this.loseTextStyle
    )
    this.tutorialText = this.add.text(
      405,
      100,
      "Use the arrow keys or\nthe WASD keys to move.\n\nHitting the walls inside the \nscreen will cause you to lose.\n\nHit the goal post \nat the end to win.",
      this.tutorialTextStyle
    )
  }

  /**
   * Loads in Level 2
   */
  addLevel2() {
    // Add Player
    this.addPlayer(0, 0)
    // Add Level
    this.boxGroup = this.add.group()
    this.addBoxLoopY(1, 3)
    this.addBoxLoopX(3, 6, 1)
    this.addBoxLoopY(5, 3)
    this.addBoxLoopY(7, 4)
    this.goalGroup = this.add.group()
    this.addGoal(6, 0)
    this.greenKeyGroup = this.add.group()
    this.addGreenKey(8, 0)
    this.greenKeyDoorGroup = this.add.group()
    this.addGreenKeyDoor(6, 3)
    // Add Gui
    this.bottomGui = this.physics.add.sprite(0, 1197, "bottomGui").setScale(4.0)
    this.sideBui = this.physics.add.sprite(1965, 0, "sideGui").setScale(3.0)
    // Add Text
    this.loseText = this.add.text(
      20,
      1015,
      "Times lost: " + timesLost,
      this.loseTextStyle
    )
    this.tutorialText = this.add.text(
      460,
      250,
      "Grab the key and touch \nthe key door to open it.",
      this.tutorialTextStyle
    )
    this.greenKeyCountText = this.add.text(
      1832,
      0,
      greenKeysHeld,
      this.greenKeyCountTextStyle
    )
  }

  /**
   * Loads in Level 3
   */
  addLevel3() {
    // Add Player
    this.addPlayer(0, 0)
    // Add Level
    this.boxGroup = this.add.group()
    this.addBoxLoopY(1, 3)
    this.addBoxLoopX(3, 6, 1)
    this.addBoxLoopY(5, 3)
    this.addBoxLoopY(7, 4)
    this.goalGroup = this.add.group()
    this.addGoal(6, 0)
    this.greenKeyGroup = this.add.group()
    this.addGreenKey(8, 0)
    this.greenKeyDoorGroup = this.add.group()
    this.addGreenKeyDoor(6, 2)
    this.redKeyGroup = this.add.group()
    this.addRedKey(6, 3)
    this.redKeyDoorGroup = this.add.group()
    this.addRedKeyDoor(8, 2)
    // Add Gui
    this.bottomGui = this.physics.add.sprite(0, 1197, "bottomGui").setScale(4.0)
    this.sideBui = this.physics.add.sprite(1965, 0, "sideGui").setScale(3.0)
    // Add Text
    this.loseText = this.add.text(
      20,
      1015,
      "Times lost: " + timesLost,
      this.loseTextStyle
    )
    this.tutorialText = this.add.text(
      420,
      250,
      "Keys can only open the key\ndoor matching their colour.",
      this.tutorialTextStyle
    )
    this.greenKeyCountText = this.add.text(
      1832,
      0,
      greenKeysHeld,
      this.greenKeyCountTextStyle
    )
    this.redKeyCountText = this.add.text(
      1832,
      100,
      redKeysHeld,
      this.redKeyCountTextStyle
    )
  }

  /**
   * Loads in Level 4
   */
  addLevel4() {
    // Add Player
    this.addPlayer(0, 0)
    // Add Level
    this.powerUpGroup = this.add.group()
    this.addPowerUp(0, 4)
    this.goalGroup = this.add.group()
    this.addGoal(8, 0)
    this.greenKeyGroup = this.add.group()
    this.addGreenKey(2, 0)
    this.greenKeyDoorGroup = this.add.group()
    this.addGreenKeyDoor(4, 3)
    this.redKeyGroup = this.add.group()
    this.addRedKey(4, 4)
    this.redKeyDoorGroup = this.add.group()
    this.addRedKeyDoor(8, 1)
    this.boxGroup = this.add.group()
    this.steelBoxGroup = this.add.group()
    this.addBoxLoopY(1, 5)
    this.addBoxLoopY(2, 5)
    this.addBoxLoopY(3, 3)
    this.addBoxLoopY(3, 5, 3, 1)
    this.addBoxLoopY(4, 3)
    this.addBoxLoopY(5, 3)
    this.addBoxLoopY(5, 5, 3, 1)
    this.addBoxLoopY(6, 5)
    this.addBoxLoopY(7, 2, 0, 1)
    this.addBoxLoopY(7, 5, 2)
    // Add Gui
    this.bottomGui = this.physics.add.sprite(0, 1197, "bottomGui").setScale(4.0)
    this.sideBui = this.physics.add.sprite(1965, 0, "sideGui").setScale(3.0)
    // Add Text
    this.loseText = this.add.text(
      20,
      1015,
      "Times lost: " + timesLost,
      this.loseTextStyle
    )
    this.tutorialText = this.add.text(
      318,
      325,
      "After grabbing a power up, you can destroy regular boxes.\nSome boxes may have things hidden in them.\nSteel boxes cannot be destroyed.",
      this.tutorialTextStyle
    )
    this.greenKeyCountText = this.add.text(
      1832,
      0,
      greenKeysHeld,
      this.greenKeyCountTextStyle
    )
    this.redKeyCountText = this.add.text(
      1832,
      100,
      redKeysHeld,
      this.redKeyCountTextStyle
    )
  }

  /**
   * Loads in Level 5
   */
  addLevel5() {
    // Add Player
    this.addPlayer(0, 0)
    // Add Level
    this.powerUpGroup = this.add.group()
    this.addPowerUp(0, 4)
    this.goalGroup = this.add.group()
    this.addGoal(8, 0)
    this.greenKeyGroup = this.add.group()
    this.addGreenKey(2, 0)
    this.greenKeyDoorGroup = this.add.group()
    this.addGreenKeyDoor(4, 3)
    this.redKeyGroup = this.add.group()
    this.addRedKey(4, 4)
    this.redKeyDoorGroup = this.add.group()
    this.addRedKeyDoor(8, 1)
    this.boxGroup = this.add.group()
    this.steelBoxGroup = this.add.group()
    this.addBoxLoopY(1, 5)
    // Add Gui
    this.bottomGui = this.physics.add.sprite(0, 1197, "bottomGui").setScale(4.0)
    this.sideBui = this.physics.add.sprite(1965, 0, "sideGui").setScale(3.0)
    // Add Text
    this.loseText = this.add.text(
      20,
      1015,
      "Times lost: " + timesLost,
      this.loseTextStyle
    )
    this.tutorialText = this.add.text(
      318,
      325,
      "After grabbing a power up, you can destroy regular boxes.\nSome boxes may have things hidden in them.\nSteel boxes cannot be destroyed.",
      this.tutorialTextStyle
    )
    this.greenKeyCountText = this.add.text(
      1832,
      0,
      greenKeysHeld,
      this.greenKeyCountTextStyle
    )
    this.redKeyCountText = this.add.text(
      1832,
      100,
      redKeysHeld,
      this.redKeyCountTextStyle
    )
  }

  /**
   * Constructs varibles
   */
  constructor() {
    super({ key: "gameScene" })

    // Player Element
    this.player = null

    // Control Elements
    this.currentLevel = null
    this.justCompletedLevel = null

    // Gui Elements
    this.retryBackground = null
    this.bottomGui = null
    this.sideGui = null
    this.retryButton = null

    // Text Elements
    this.loseText = null
    this.loseTextStyle = {
      font: "50px Arial",
      fill: "#ffffff",
      align: "center",
    }
    this.tutorialText = null
    this.tutorialTextStyle = {
      font: "45px Arial",
      fill: "#ffffff",
      align: "center",
    }
    this.greenKeyCountText = null
    this.greenKeyCountTextStyle = {
      font: "100px Arial",
      fill: "#6aa84fff",
      align: "center",
    }
    this.redKeyCountText = null
    this.redKeyCountTextStyle = {
      font: "100px Arial",
      fill: "#cc0000ff",
      align: "center",
    }
  }

  /**
   * Initializes groups
   */
  init(data) {
    this.cameras.main.setBackgroundColor("#000000")
    this.currentLevel = data.level
    this.justCompletedLevel = data.justCompletedLevel
  }

  /**
   * Preloads files
   */
  preload() {
    console.log("Game Scene, Current Level: " + this.currentLevel)
    if (this.justCompletedLevel === true) {
      console.log("Level was completed.")
    }

    // Images
    this.load.image("playerImage", "assets/playerImage.png")
    this.load.image("playerPoweredUpImage", "assets/playerPoweredUp.png")
    this.load.image("boxImage", "assets/box.png")
    this.load.image("steelBoxImage", "assets/steelBox.png")
    this.load.image("goalImage", "assets/goal.png")
    this.load.image("powerUpImage", "assets/powerUp.png")
    this.load.image("keyImage", "assets/key.png")
    this.load.image("keyDoorImage", "assets/keyDoor.png")
    this.load.image("redKeyImage", "assets/redKey.png")
    this.load.image("redKeyDoorImage", "assets/redKeyDoor.png")
    this.load.image("bottomGui", "assets/bottomGUI.png")
    this.load.image("sideGui", "assets/sideGUI.png")
    this.load.image("retryButton", "assets/retryButton.png")
    this.load.image("retryBackground", "assets/retryBackground.png")
  }

  /**
   * Creates varibles and functions
   */
  create(data) {
    // Load current level
    if (this.currentLevel === 1) {
      this.addLevel1()
    } else if (this.currentLevel === 2) {
      this.addLevel2()
    } else if (this.currentLevel === 3) {
      this.addLevel3()
    } else if (this.currentLevel === 4) {
      this.addLevel4()
    } else if (this.currentLevel === 5) {
      this.addLevel5()
    } else {
      console.log("Error: Unknown Level ID")
    }
    // Box collision functions
    this.physics.add.collider(
      this.playerGroup,
      this.boxGroup,
      function (playerCollide, boxCollide) {
        if (powerUpActive != true) {
          playerCollide.destroy()
          greenKeysHeld = 0
          redKeysHeld = 0
          powerUpActive = false
          timesLost++
          this.loseText.text = "Times lost: " + timesLost
          this.addRetryButton()
        } else {
          boxCollide.destroy()
        }
      }.bind(this)
    )
    this.physics.add.collider(
      this.playerGroup,
      this.steelBoxGroup,
      function (playerCollide, boxCollide) {
        playerCollide.destroy()
        powerUpActive = false
        greenKeysHeld = 0
        redKeysHeld = 0
        timesLost++
        this.loseText.text = "Times lost: " + timesLost
        this.addRetryButton()
      }.bind(this)
    )
    // Power Up collision functions
    this.physics.add.collider(
      this.playerGroup,
      this.powerUpGroup,
      function (playerCollide, powerUpCollide) {
        playerCollide.setTexture("playerPoweredUpImage")
        powerUpActive = true
      }.bind(this)
    )
    // Green key collision functions
    this.physics.add.collider(
      this.playerGroup,
      this.greenKeyDoorGroup,
      function (playerCollide, boxCollide) {
        if (greenKeysHeld > 0) {
          boxCollide.destroy()
          greenKeysHeld = greenKeysHeld - 1
          this.greenKeyCountText.text = greenKeysHeld
        } else {
          playerCollide.destroy()
          powerUpActive = false
          greenKeysHeld = 0
          redKeysHeld = 0
          timesLost++
          this.loseText.text = "Times lost: " + timesLost
          this.addRetryButton()
        }
      }.bind(this)
    )
    this.physics.add.collider(
      this.playerGroup,
      this.greenKeyGroup,
      function (playerCollide, keyCollide) {
        keyCollide.destroy()
        greenKeysHeld++
        this.greenKeyCountText.text = greenKeysHeld
      }.bind(this)
    )
    // Red key collision functions
    this.physics.add.collider(
      this.playerGroup,
      this.redKeyDoorGroup,
      function (playerCollide, boxCollide) {
        if (redKeysHeld > 0) {
          boxCollide.destroy()
          redKeysHeld = redKeysHeld - 1
          this.redKeyCountText.text = redKeysHeld
        } else {
          playerCollide.destroy()
          powerUpActive = false
          greenKeysHeld = 0
          redKeysHeld = 0
          timesLost++
          this.loseText.text = "Times lost: " + timesLost
          this.addRetryButton()
        }
      }.bind(this)
    )
    this.physics.add.collider(
      this.playerGroup,
      this.redKeyGroup,
      function (playerCollide, keyCollide) {
        keyCollide.destroy()
        redKeysHeld++
        this.redKeyCountText.text = redKeysHeld
      }.bind(this)
    )
    // Goal collision function
    this.physics.add.collider(
      this.playerGroup,
      this.goalGroup,
      function (playerCollide, goalCollide) {
        console.log("Finished Level " + this.currentLevel)
        powerUpActive = false
        this.scene.start("gameScene", {
          level: this.currentLevel + 1,
          justCompletedLevel: true,
        })
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
      if (this.player.x > 1750) {
        this.player.x = 1750
      }
    }
  }
}

export default GameScene
