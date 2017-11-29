const Bodies = require('./Bodies.js') 

//pass in context and have player draw itself
class Player extends Bodies {
  constructor(x,y) {
    super(x, y)
    this.width = 20;
    this.height = 40;
    this.dx = 0;
    this.dy = 0;
    this.direction = "right";
    this.jumping = false;

  }

  update() {
    if (this.jumping && this.dy < -.8){
      this.dy = this.dy*.92;
    } else {
      this.dy = this.gravity()
      this.jumping = false;
    }
    this.x += this.dx;
    this.y += this.dy;
  };

  gravity() {
    if (this.y > 600 - this.height) {
      return 0;
    } else if (this.dy >-1 && this.dy < 0.5){ //dy approaching jump peak
      return .5;
    } else if (this.dy >= 5) { //dy max on free fall
      return 5
    } else { //
      return this.dy*1.5 //sets increasing dy
    }
  }

  jump(direction) {
    this.jumping = true;
    this.dy = -10;
    if (direction === 'left') {
      this.dx = -4;
    } else if (direction === 'right') {
      this.dx = 4;
    }
  }

  move(key) {
    if (key.isDown(37)) { //&& !this.jumping - prevents midair direction change
      this.dx = -4;
      this.direction = "right";
    } else if (key.isDown(39)) { //as above
      this.dx = 4;
      this.direction = "left"
    }
    else if (!this.jumping) {
      this.dx = 0;
    }

    if (key.isDown(32) && this.y > 500 && key.isDown(37)) {
      this.jump('left');
      this.dx = -4;
    } else if (key.isDown(32) && this.y > 500 && key.isDown(39)) {
      this.jump('right');
      this.dx = 4;
    } else if (key.isDown(32) && this.y > 500) {
      this.jump();
    }


  }

}


module.exports = Player;