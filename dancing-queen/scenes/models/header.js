function Header() {
  var self = this;
  var drawStart = 100;
  var marginBetweenBtns = 35;
  var score = 0;
  this.isPaused = false;
  this.height = 170;
  this.soundBtn = new ControlButton(icons.sound.img, drawStart, this.height / 2, icons.sound.w, icons.sound.h);
  this.soundBtn.typeText = 'sound';

  this.pauseBtn = new ControlButton(icons.pause.img, drawStart + icons.pause.w + marginBetweenBtns, this.height / 2, icons.pause.w, icons.pause.h);
  this.pauseBtn.typeText = 'pause';

  this.closeBtn = new ControlButton(icons.close.img, drawStart + (icons.pause.w + icons.sound.w + 2 * marginBetweenBtns), this.height / 2, icons.reset.w, icons.reset.h);
  this.closeBtn.typeText = 'close';

  this.soundBtn.onUpdate = function() {
    this.x = drawStart;
    this.y = self.height / 2;
    if(windowWidth <= 768) {
      var mx = drawStart + (icons.pause.w + icons.sound.w + 2 * marginBetweenBtns);
      this.x += width - mx - drawStart * (2/3);
      this.y -= self.height / 4;
    }
  }

  this.pauseBtn.onUpdate = function() {
    this.x = drawStart + icons.sound.w + marginBetweenBtns;
    this.y = self.height / 2;
    if(windowWidth <= 768) {
      var mx = drawStart + (icons.pause.w + icons.sound.w + 2 * marginBetweenBtns);
      this.x += width - mx - drawStart * (2/3);
      this.y -= self.height / 4;
    }
  }

  this.closeBtn.onUpdate = function() {
    this.x = drawStart + (icons.pause.w + icons.sound.w + 2 * marginBetweenBtns);
    this.y = self.height / 2;
    if(windowWidth <= 768) {
      var mx = drawStart + (icons.pause.w + icons.sound.w + 2 * marginBetweenBtns);
      this.x += width - mx - drawStart * (2/3);
      this.y -= self.height / 4;
    }
  }

  this.btns = [ this.soundBtn, this.pauseBtn, this.closeBtn ];


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
      rect(width - 50 + 20 - 245, self.height / 4 - 30, 245, 60, 60);
      var coef = 1.5;

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
      textSize(32);
      textFont(fonts.LGVBold);
      textAlign(RIGHT, TOP);
      text('umaRlesi qula: 789', width - 50, self.height / 2);

      textAlign(RIGHT, TOP);
      text('qula: ' + score, width - 50, self.height / 2 + 32);
    } else {
      fill(255);
      textSize(38);
      textFont(fonts.LGVBold);
      textAlign(LEFT, CENTER);
      text('umaRlsei qula: 914', width / 2, 85);

      textAlign(RIGHT, CENTER);
      text('qula: ' + score, width - drawStart + 25, 85);
    }
  }
}