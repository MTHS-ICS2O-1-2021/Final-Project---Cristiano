/* global Phaser */

// Cristiano
// Final-Project---Cristiano
// June 7 2022

const debugMode = true

import SplashScene from "./splashScene.js"
import MenuScene from "./menuScene.js"
import LevelOneScene from "./levels/levelOneScene.js"
import LevelTwoScene from "./levels/levelTwoScene.js"
import LevelThreeScene from "./levels/levelThreeScene.js"
import LevelFourScene from "./levels/levelFourScene.js"

// Scenes
const splashScene = new SplashScene()
const menuScene = new MenuScene()
const levelOneScene = new LevelOneScene()
const levelTwoScene = new LevelTwoScene()
const levelThreeScene = new LevelThreeScene()
const levelFourScene = new LevelFourScene()

// Game Settings
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: "arcade",
    arcade: {
      debug: debugMode,
    },
  },
  backgroundColor: 0xffffff,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
}

const game = new Phaser.Game(config)
console.log(game)

game.scene.add("splashScene", splashScene)
game.scene.add("menuScene", menuScene)
game.scene.add("levelOneScene", levelOneScene)
game.scene.add("levelTwoScene", levelTwoScene)
game.scene.add("levelThreeScene", levelThreeScene)
game.scene.add("levelFourScene", levelFourScene)

if (debugMode == true) {
  game.scene.start("levelFourScene")
} else {
  game.scene.start("splashScene")
}
