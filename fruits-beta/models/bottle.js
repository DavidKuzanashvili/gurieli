function Bottle(options) {
    options = options || {};
    this.x = options.x || 0;
    this.type = options.type || 'undefined';
    this.width = options.width || 140;
    this.height = options.height || 475;
    this.movmentSpeed = options.speed || 50;
    this.y = (height - this.height / 4 + 10);
    this.fruits = [];
    var fruitsOffsetXSpeed = 10;

    this.draw = function () {
        this.drawFruits();
        push();

        imageMode(CENTER);
        image(bottleImages[this.type], this.x, this.y, this.width, this.height);

        pop();
    }

    this.addFruit = function (fruits) {
        for (var i = 0; i < fruits.length; i++) {
            var fruit = fruits[i];

            fruit.uniqueIdForBottle = Math.random().toString(36).substr(2, 9);
            fruit.offsetXToBottle = this.x - fruit.x;
            fruit.events.scaleDown.end = function () {
                for (var i = this.fruits.length - 1; i >= 0; i--) {
                    if (this.fruits[i].uniqueIdForBottle === fruit.uniqueIdForBottle) {
                        this.fruits.splice(i, 1);
                        break;
                    }
                }
            }.bind(this);

            fruit.animate('scaleDown');

            this.fruits.push(fruit);
        }
    }

    this.update = function () {
        this.updateFruits();
        this.y = (height - this.height / 4 + 10);

        if (mouseX > this.x) {
            this.x = Math.min(this.x + this.movmentSpeed, mouseX);
        }

        if (mouseX < this.x) {
            this.x = Math.max(this.x - this.movmentSpeed, mouseX);
        }
    }

    this.updateFruits = function () {
        for (var i = this.fruits.length - 1; i >= 0; i--) {
            fruit = this.fruits[i];
            fruit.update();

            if (fruit.offsetXToBottle !== 0) {
                if (fruit.offsetXToBottle > 0) {
                    fruit.offsetXToBottle = Math.max(fruit.offsetXToBottle - fruitsOffsetXSpeed, 0);
                } else {
                    fruit.offsetXToBottle = Math.min(fruit.offsetXToBottle + fruitsOffsetXSpeed, 0);
                }
            }

            fruit.x = this.x - fruit.offsetXToBottle;
        }
    }

    this.drawFruits = function () {
        for (var i = 0; i < this.fruits.length; i++) {
            this.fruits[i].draw();
        }
    }

    this.hitCorrectFruit = function (type, correctTypes) {
        var isCorrect = false;
        correctTypes.forEach(function (t) {
            if (t === type) {
                isCorrect = true;
            }
        });

        return isCorrect;
    }

    this.hitFruit = function (fruit) {
        var bottleLeft = this.x - this.width / 2;
        var bottleRight = this.x + this.width / 2;
        var bottleTop = this.y - this.height / 2;
        return fruit.x > bottleLeft && fruit.x < bottleRight && fruit.y > bottleTop && fruit.y < bottleTop + 20;
    }
} 