function ControlButton(type, x, y, w, h, typeText) {
  this.type = type;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.isSound = true;
  this.typeText = typeText || '';
  this.onUpdate = function() {};
  var defaultType = this.type;
  var hoverType = 'yellow' + capitalize(this.typeText);

  this.draw = function() {
    push();

    if(this.contains(mouseX, mouseY)) {
      cursor('pointer');
    }
    
    imageMode(CENTER);
    image(this.type, this.x, this.y, this.w, this.h);

    pop();
  }

  this.update = function() {
    this.onUpdate();
    if(this.typeText !== 'share' && this.typeText !== 'resume' && this.typeText !== 'arrow') {
      if(this.typeText === 'sound') {
        if(this.isSound) {
          if(this.contains(mouseX, mouseY)) {
            this.type = icons[hoverType].img;
          } else {
            this.type = defaultType;
          }
        } else {
          if(this.contains(mouseX, mouseY)) {
            this.type = icons['yellowMute'].img;
          } else {
            this.type = icons['mute'].img;
          }
        }
      } else {
        if(this.contains(mouseX, mouseY)) {
          this.type = icons[hoverType].img;
        } else {
          this.type = defaultType;
        }
      }
    }
  }

  this.contains = function(x, y) {
    var w = this.w / 2;
    var h = this.h / 2;

    return x > this.x - w
        && x < this.x + w
        && y > this.y - h
        && y < this.y + h;
  }

  function capitalize(str) 
  {
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
  }
}