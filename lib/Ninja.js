const Player = require('./Player.js')
const Kunai = require('./Kunai.js');

class Ninja extends Player {
  constructor() {
    super(...arguments);
    this.jumping = false;
    this.canDoubleJump = true;
    this.upgradeSpeed = 1;
    this.lives = 2;
    this.shotTiming = 0;
    this.wepNumber = 1;
    this.reloadDelay = 1200;
  }

    arrow() {
    if (this.quiver > 0) {
      this.quiver--;
      if (this.wepNumber > this.quiver) {
        this.wepNumber = 0
      } else {
        this.wepNumber++;
      }
      this.shooting = true;
      const arrow = new Kunai(this);

      this.arrows.push(arrow);
      setTimeout(() => {
        this.shooting = false
      }, 1000);
      //reload
      (() => {
        if (this.canReload) {
          this.canReload = false;
          setTimeout(() => {
            this.quiver = 3 + this.upgradeQuiver;
            this.canReload = true;
          }, this.reloadDelay)
        }
      })()
    }
  }

  setPlayerSprite() {
    if (this.dead) {
      this.spriteSrc = '../assets/explosion.png'
    } else if (this.player === 'player2') {
      this.spriteSrc = '../assets/ninja-sprites.png'
    } else {
      this.spriteSrc = '../assets/ninja-sprites.png'
    }
  }
  

}

module.exports = Ninja;