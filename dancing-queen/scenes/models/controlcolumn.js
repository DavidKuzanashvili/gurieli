function ControlColumn(btnType, x, buttonColor) {
  this.btnType = btnType;
  this.x = x;
  this.offsetTop = 170;
  this.isPaused = false;
  var oControl = this;
  var w = width / 8;
  var h = height - this.offsetTop; 
  var backgroundColor = hexToRgb(colors.boogerTwo);
  var alpha = 0.3;
  var btnSize = 50;
  this.arrows = [];
  this.arrowRotation = 0;
  this.btn = new ControlButton(arrow.img, 0, 0, arrow.w, arrow.h);
  this.btn.typeText = this.btnType;

  this.draw = function() {
    push();

    fill(backgroundColor.r, backgroundColor.g, backgroundColor.b, 255 * alpha);
    noStroke();
    rect(this.x, this.offsetTop, w, h);
    fill(colors.boogerTwo);
    rect(this.x, height - 300, w, h / 5);
    stroke(colors.lightTan);
    strokeWeight(2);
    line(this.x + w, this.offsetTop, this.x + w, height);
    dropArrows();
    
    translate(this.x + (w / 2), this.offsetTop);
    rotate(this.arrowRotation);
    this.btn.update();
    this.btn.draw();

    pop();
  }

  this.update = function() {
    
  }

  function dropArrows() {
    for(var i = 0; i < oControl.arrows.length; i++) {
      if(oControl.arrows[i].isInActiveArea(height - 300)) {
        oControl.arrows[i].bgColor = hexToRgb(colors.lightTan);
        oControl.arrows[i].alpha = 0.7;
        ACTIVE_KEY_CODES.add(oControl.arrows[i].keycode);
      }

      if(oControl.arrows[i].passedActiveArea(height - 300, h / 5)) {
        oControl.arrows[i].reset();
        ACTIVE_KEY_CODES.delete(oControl.arrows[i].keycode);
      }

      if(!oControl.isPaused) {
        oControl.arrows[i].update();
      }
      oControl.arrows[i].draw();

      if(oControl.arrows[i].y > height) {
        oControl.arrows.splice(i, 1);
        i--;
        continue;
      }
    }
  }
}