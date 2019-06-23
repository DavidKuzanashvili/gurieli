function Leaves(leavesType) {
  this.leavesType = leavesType;
  this.leafRotationSpeed = 0.2;
  this.changeX = 10;
  var diffX = 0;
  var activeAnimation = 'animateLeft';
  var animations = {
    animateLeft:  {
      update: function() {
        if(diffX < this.changeX) {
          diffX += this.leafRotationSpeed;
        } else {
          diffX = this.changeX;
          this.animate('animateRight');
        }
      }.bind(this),
    },
    animateRight: {
      update: function() {
        if(diffX >= 0) {
          diffX -= this.leafRotationSpeed;
        } else {
          diffX = 0;
          this.animate('animateLeft');
        }
      }.bind(this)
    }
  }

  this.draw = function() {
    push();

    image(leavesImages[this.leavesType][0], 0, 0, width, 300);

    if(leavesImages[this.leavesType].length > 1) {
      for(var i = 1; i < leavesImages[this.leavesType].length; i++) {
        push();

        var a = atan2(diffX * diffX, diffX + i * 450);
        translate(420 * i, 0);
        rotate(a);
        // imageMode(CENTER);
        image(leavesImages[this.leavesType][i], 0, -50, 250, 260);

        pop();
      }
    }

    pop();
  }

  this.update = function() {
    UpdateAnimation(); 
  }

  this.animate = function(type) {
    if(animations.hasOwnProperty(type)) {
      activeAnimation = type;
    } else {
      activeAnimation = null;
    }
  }

  function UpdateAnimation() {
    if(activeAnimation === null) {
      return;
    }

    animations[activeAnimation].update();
  }
}