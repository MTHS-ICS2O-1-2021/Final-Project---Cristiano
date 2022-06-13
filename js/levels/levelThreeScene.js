/* global Phaser */

// Cristiano
// Final-Project---Cristiano
// June 7 2022
// LevelThree Scene

var greenKeysHeld = 0
var redKeysHeld = 0

/**
 * Phaser Scene
 */
class LevelThreeScene extends Phaser.Scene {
  /**
   * Adds a dangerous box
   */
  addBox(boxX, boxY) {
    const box = this.physics.add.sprite(boxX, boxY, "boxImage").setScale(2.0)
    box

    this.boxGroup.add(box)
  }

  /**
   * Adds dangerous boxes in a line along the y axis
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
   * Adds dangerous boxes in a line along the x axis
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
   * Adds a green key door
   */
  addGreenKeyDoor(keyDoorX, keyDoorY) {
    const keyDoor = this.physics.add.sprite(keyDoorX, keyDoorY, "keyDoorImage").setScale(2.0)

    this.greenKeyDoorGroup.add(keyDoor)
  }

  /**
   * Adds a green key that opens a green key door
   */
  addGreenKey(keyX, keyY) {
    const key = this.physics.add.sprite(keyX, keyY, "keyImage")

    this.greenKeyGroup.add(key)
  }

  /**
   * Adds a red key door
   */
  addRedKeyDoor(keyDoorX, keyDoorY) {
    const keyDoor = this.physics.add.sprite(keyDoorX, keyDoorY, "redKeyDoorImage").setScale(2.0)

    this.redKeyDoorGroup.add(keyDoor)
  }

  /**
   * Adds a red key that opens a red key door
   */
  addRedKey(keyX, keyY) {
    const key = this.physics.add.sprite(keyX, keyY, "redKeyImage")

    this.redKeyGroup.add(key)
  }

  /**
   * Adds the goal post
   */
  addGoal(goalX, goalY) {
    const goal = this.physics.add.sprite(goalX, goalY, "goalImage")

    this.goalGroup.add(goal)
  }

  /**
   * Constructs varibles
   */
  constructor() {
    super({ key: "levelThreeScene" })

    // Player Element
    this.player = null

    // Gui Elements
    this.timesLost = null
    this.bottomGui = null
    this.sideGui = null

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
    console.log("Level Three Scene")

    this.load.image("playerImage", "assets/playerImage.png")
    this.load.image("boxImage", "assets/box.png")
    this.load.image("goalImage", "assets/goal.png")
    this.load.image("keyImage", "assets/key.png")
    this.load.image("keyDoorImage", "assets/keyDoor.png")
    this.load.image("redKeyImage", "assets/redKey.png")
    this.load.image("redKeyDoorImage", "assets/redKeyDoor.png")
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
    this.addBoxLoopY(300, 3)
    this.addBoxLoopX(700, 6, 1)
    this.addBoxLoopY(1100, 3)
    this.addBoxLoopY(1500, 4)
    this.goalGroup = this.add.group()
    this.addGoal(1300, 100)
    this.greenKeyGroup = this.add.group()
    this.addGreenKey(1700, 100)
    this.greenKeyDoorGroup = this.add.group()
    this.addGreenKeyDoor(1300, 500)
    this.redKeyGroup = this.add.group()
    this.addRedKey(1300, 700)
    this.redKeyDoorGroup = this.add.group()
    this.addRedKeyDoor(1700, 500)
    // Add Gui
    this.bottomGui = this.physics.add.sprite(0, 1197, "bottomGui").setScale(4.0)
    this.sideBui = this.physics.add.sprite(1965, 0, "sideGui").setScale(3.0)
    // Add Text
    this.loseText = this.add.text(
      20,
      1015,
      "Times lost: " + this.timesLost,
      this.loseTextStyle
    )
    this.tutorialText = this.add.text(
      420,
      250,
      "Keys can only open the key\ndoor matching their colour.",
      this.tutorialTextStyle
    )
    // Box collision functions
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
    // Green key collision functions
    this.physics.add.collider(
      this.player,
      this.greenKeyDoorGroup,
      function (playerCollide, boxCollide) {
        if (greenKeysHeld > 0) {
          boxCollide.destroy()
          greenKeysHeld = greenKeysHeld - 1
          console.log("Player is now holding " + greenKeysHeld + " green keys.")
        } else {
          this.timesLost++
          this.loseText.text = "Times lost: " + this.timesLost
          playerCollide.x = 100
          playerCollide.y = 100
        }
      }.bind(this)
    )
    this.physics.add.collider(
      this.player,
      this.greenKeyGroup,
      function (playerCollide, keyCollide) {
        keyCollide.destroy()
        greenKeysHeld++
        console.log("Player is now holding " + greenKeysHeld + " green keys.")
      }.bind(this)
    )
    // Red key collision functions
    this.physics.add.collider(
      this.player,
      this.redKeyDoorGroup,
      function (playerCollide, boxCollide) {
        if (redKeysHeld > 0) {
          boxCollide.destroy()
          redKeysHeld = redKeysHeld - 1
          console.log("Player is now holding " + redKeysHeld + " red keys.")
        } else {
          this.timesLost++
          this.loseText.text = "Times lost: " + this.timesLost
          playerCollide.x = 100
          playerCollide.y = 100
        }
      }.bind(this)
    )
    this.physics.add.collider(
      this.player,
      this.redKeyGroup,
      function (playerCollide, keyCollide) {
        keyCollide.destroy()
        redKeysHeld++
        console.log("Player is now holding " + redKeysHeld + " red keys.")
      }.bind(this)
    )
    // Goal collision function
    this.physics.add.collider(
      this.player,
      this.goalGroup,
      function (playerCollide, goalCollide) {
        console.log("Finished Level Three")
        //this.scene.switch("levelFourScene")
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

export default LevelThreeScene
