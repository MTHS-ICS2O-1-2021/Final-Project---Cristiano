/* global Phaser */

// Cristiano
// Final-Project---Cristiano
// June 7 2022
// Splash Scene

class SplashScene extends Phaser.Scene {
  constructor () {
    super({ key: 'splashScene' })
  }
  
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  
  preload () {
    console.log('Splash Scene')
  }
  
  create (data) {
    
  }
  
  update (time, delta) {
    
  }
}

export default SplashScene