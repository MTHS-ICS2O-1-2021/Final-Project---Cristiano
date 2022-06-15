/* global Phaser */

// Cristiano
// Final-Project---Cristiano
// June 7 2022

const debugMode = true

import SplashScene from "./splashScene.js"
import MenuScene from "./menuScene.js"
import GameScene from "./gameScene.js"

// Scenes
const splashScene = new SplashScene()
const menuScene = new MenuScene()
const gameScene = new GameScene()

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

if (debugMode == true) {
  game.scene.start("gameScene", { level: 4 })
} else {
  game.scene.start("splashScene")
}
