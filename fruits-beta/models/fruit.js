function Fruit(options) {
    options = options || {};
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.type = options.type || 'undifined';
    this.width = options.width || 50;
    this.height = options.height || 50;
    this.fallSpeed = options.fallSpeed || 1;
    var randomFruitMode = round(random(0, fruitImages[this.type].length - 1));

    this.draw = function() {
        push();

        imageMode(CENTER);
        image(fruitImages[this.type][randomFruitMode], this.x, this.y, this.width, this.height);

        pop();
    }

    this.update = function() {
        this.y += this.fallSpeed;
    }

    this.isOutsideOfScene = function() {
        if(this.y > height + this.height) {
            return true;
        }

        return false;
    }
}