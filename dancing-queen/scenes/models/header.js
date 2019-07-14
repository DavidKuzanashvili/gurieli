function Header() {
  var self = this;
  var drawStart = 100;
  var marginBetweenBtns = 35;
  var score = 0;
  this.isPaused = false;
  this.height = 170;
  this.soundBtn = new ControlButton(icons.sound.img, drawStart, this.height / 2, icons.sound.w, icons.sound.h, 'sound');

  this.pauseBtn = new ControlButton(icons.pause.img, drawStart + icons.pause.w + marginBetweenBtns, this.height / 2, icons.pause.w, icons.pause.h, 'pause');

  this.closeBtn = new ControlButton(icons.close.img, drawStart + (icons.pause.w + icons.sound.w + 2 * marginBetweenBtns), this.height / 2, icons.reset.w, icons.reset.h, 'close');

  this.soundBtn.onUpdate = function() {
    this.x = drawStart;
    this.y = self.height / 2;
    if(windowWidth <= 768) {
      var marginBB = 10;
      var mx = (icons.pause.w + icons.sound.w + 2 * marginBetweenBtns);
      mx = 20 + 20 + icons.close.w / coef + icons.pause.w / coef + icons.sound.w / coef / 2 + 20 * 2;
      this.x = width - mx;
      this.y -= self.height / 4;
    }
  }

  this.pauseBtn.onUpdate = function() {
    this.x = drawStart + icons.sound.w + marginBetweenBtns;
    this.y = self.height / 2;
    if(windowWidth <= 768) {
      var mx = (icons.pause.w + icons.sound.w + 2 * marginBetweenBtns);
      mx = 20 + 20 + icons.close.w / coef + icons.pause.w / coef / 2 + 20;
      this.x = width - mx;
      this.y -= self.height / 4;
    }
  }

  this.closeBtn.onUpdate = function() {
    this.x = drawStart + (icons.pause.w + icons.sound.w + 2 * marginBetweenBtns);
    this.y = self.height / 2;
    if(windowWidth <= 768) {
      var mx = (icons.pause.w + icons.sound.w + 2 * marginBetweenBtns);
      mx = 20 + 20 + icons.close.w / coef / 2;
      this.x = width - mx;
      this.y -= self.height / 4;
    }
  }

  this.btns = [ this.soundBtn, this.pauseBtn, this.closeBtn ];

  var coef = 0;
  this.draw = function() {
    push();

    //Background
    if(windowWidth < 768) {
      fill(colors.lightTan);
    } else {
      fill(colors.boogerTwo);
    }

    noStroke();
    rect(0, 0, width, this.height);

    //Statistics
    drawStats();

    //Buttons
    if(windowWidth <= 768) {
      rectMode(CORNER);
      fill(134, 178, 61, 102);
      var rw = (icons.pause.w + icons.close.w + icons.sound.w) / coef + 20 * 2 + 2 * 20;
      rect(width - rw - 20, 12, rw, 60, 60);
      coef = 1.5;

      this.btns.forEach(function(btn) {
        btn.update();
        btn.w /= coef;
        btn.h /= coef;
        btn.draw();
        btn.w *= coef;
        btn.h *= coef;
      });
    } else {

      this.btns.forEach(function(btn) {
        btn.update();
        btn.draw();
      });
    }


    pop();
  }

  this.setScore = function(value) {
    score = value;
  }

  function drawStats() {
    if(windowWidth < 768) {
      fill(134, 178, 61);
      textSize(26);
      textFont(fonts.LGVBold);
      textAlign(RIGHT, TOP);
      text('umaRlesi qula: 462', width - 20, self.height / 2);

      textAlign(RIGHT, TOP);
      text('qula: ' + score, width - 20, self.height / 2 + 32);
    } else {
      fill(255);
      textSize(38);
      textFont(fonts.LGVBold);
      textAlign(LEFT, CENTER);
      text('umaRlesi qula: 462', width / 2, 85);

      textAlign(RIGHT, CENTER);
      text('qula: ' + score, width - drawStart + 25, 85);
    }
  }
}