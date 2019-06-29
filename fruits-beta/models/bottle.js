function Bottle(options) {
    options = options || {};
    this.x = options.x || 0;
    this.type = options.type || 'undefined';
    this.width = options.width || 140;
    this.height = options.height || 475;
    this.movmentSpeed = options.speed || 50;
    this.y = (height - this.height / 4 + 10);
    
    this.draw = function() {
        push();

        imageMode(CENTER);
        image(bottleImages[this.type], this.x, this.y, this.width, this.height);

        pop();
    }

    this.update = function() {
        if(mouseX > this.x) {
            this.x = Math.min(this.x + this.movmentSpeed, mouseX);
        }
    
        if(mouseX < this.x) {
          this.x = Math.max(this.x - this.movmentSpeed, mouseX);
        }
    }

    this.hitCorrectFruit = function(type, correctTypes) {
        var isCorrect = false;
        correctTypes.forEach(function(t) {
            if(t === type) {
                isCorrect = true;
            }
        });

        return isCorrect;
    }

    this.hitFruit = function(fruit) {
        var bottleLeft = this.x - this.width / 2 + 30;
        var bottleRight = this.x + this.width / 2 - 30;
        var bottleTop = this.y - this.height / 2;
        return fruit.x > bottleLeft && fruit.x < bottleRight && fruit.y > bottleTop && fruit.y < bottleTop + 20;
      }
} 