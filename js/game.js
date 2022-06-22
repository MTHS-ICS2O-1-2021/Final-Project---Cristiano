/* global Phaser */

// Cristiano
// Final-Project---Cristiano
// June 7 2022

const debugMode = true

import SplashScene from "./splashScene.js"
import MenuScene from "./menuScene.js"
import GameScene from "./gameScene.js"
import LoadLevelScene from "./loadLevelScene.js"
import RetryLevelScene from "./retryLevelScene.js"

// Scenes
const splashScene = new SplashScene()
const menuScene = new MenuScene()
const gameScene = new GameScene()
const loadlevelScene = new LoadLevelScene()
const retrylevelScene = new RetryLevelScene()

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
game.scene.add("gameScene", gameScene)
game.scene.add("loadlevelScene", loadlevelScene)
game.scene.add("retrylevelScene", retrylevelScene)

if (debugMode == true) {
  game.scene.start("gameScene", {
    level: 10,
    timesLost: 0,
  })
} else {
  game.scene.start("splashScene")
}
