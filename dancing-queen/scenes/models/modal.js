function Modal(options) {
  options = options || {};
  var oModal = this;
  var self = this;
  this.backgroundColor = options.backgroundColor;
  this.shadowOffsetTop = options.shadowOffsetTop || 20;
  this.width = options.width || 640;
  this.height = options.height || 480;
  this.fontSize = options.fontSize || 40;
  this.font = options.font || fonts.LGVBold;
  this.score = 0;
  var shadowColor = darken(color(colors.boogerTwo));
  var marginLeft = 50;
  var marginTop = 100;
  var controlButtonsOffsetX = textWidth('gamorTva') * this.fontSize / 12;
  var lineHeight = 90;
  var overlayColor = hexToRgb(colors.lightTan);
  var resumeText = 'gagrZele TamaSi';
  var resumeTextWidth;
  this.statResetButton = new ControlButton(icons.reset.img, width / 2, height / 2, icons.reset.w, icons.reset.h);
  this.statResetButton.textType = 'reset';

  this.statCloseButton = new ControlButton(icons.close.img, width / 2, height / 2, icons.close.w, icons.close.h);
  this.statCloseButton.textType = 'close';

  
  this.statShareButton = new ControlButton(icons.share.img, width / 2, height / 2, icons.share.w, icons.share.h);
  this.statShareButton.textType = 'share';
  
  this.statButtons = [
    this.statResetButton,
    this.statCloseButton,
    this.statShareButton
  ];

  this.quitButtons = [
    new Button({
      x: width / 2 - this.width / 2 + 100,
      y: height / 2 + 70,
      color: 'black',
      backgroundColor: color(colors.beige),
      content: 'ki',
      width: 150,
      height: 60,
      shadowOffset: 7,
      fontSize: 30
    }),
    new Button({
      x: width / 2 + this.width / 2 - 100,
      y: height / 2 + 70,
      backgroundColor: color(colors.sand),
      content: 'ara',
      width: 150,
      height: 60,
      shadowOffset: 7,
      fontSize: 30
    })
  ];

  this.resumeBtn = new ControlButton(icons.resume.img, width / 2 + resumeTextWidth / 2 + 20, height / 2, icons.resume.w, icons.resume.h);
  this.resumeBtn.typeText = 'resume';
  // this.resumeBtn.onUpdate = function() {
  //   this.x = width / 2 + resumeTextWidth / 2 + 20;
  //   this.y = height / 2;
  // }
  
  this.drawStats = function() {
    var w = this.width;
    var h = this.height;
    var fs = this.fontSize;
    var mt = marginTop;
    var lh = lineHeight;
    var ml = marginLeft;
    var coef = 1;

    this.statResetButton.onUpdate = function() {
      this.x = width / 2 - w / 2 + controlButtonsOffsetX + this.w + 20;
      this.y = height / 2 - h / 2 + this.w / 2 - this.h / 2 + (mt + 2 * lh) - 15 * coef;
      this.w = icons.reset.w * coef;
      this.h = icons.reset.h * coef;
    }
    this.statCloseButton.onUpdate = function() {
      this.x = width / 2 - w / 2 + controlButtonsOffsetX + this.w + 20;
      this.y = height / 2 - h / 2 + this.w / 2 - this.h / 2 + (mt + 3 * lh) - 15 * coef;
      this.w = icons.close.w * coef;
      this.h = icons.close.h * coef;
    }
    this.statShareButton.onUpdate = function() {
      this.x = width / 2 + controlButtonsOffsetX + 50;
      this.y = height / 2 - h / 2 + this.w / 2 - this.h / 2 + (mt + 3 * lh) - 15;
      this.w = icons.share.w * coef;
      this.h = icons.share.h * coef;
    }

    if(windowWidth <= 800){
      coef = 0.7;
      w = parseInt(w * 0.45);
      h = parseInt(h * coef);
      fs = parseInt(fs * coef);
      mt = parseInt(mt * 0.55);
      lh = parseInt(lh * coef);
      ml = parseInt(ml * coef);
      this.statShareButton.onUpdate = function() {
        this.x = width / 2 - w / 2 + controlButtonsOffsetX + this.w + 20;
        this.y = height / 2 - h / 2 + this.w / 2 - this.h / 2 + (mt + 4 * lh) - 15 * coef;
        this.w = icons.share.w * coef;
        this.h = icons.share.h * coef;
      }
    }


    push();

    background(overlayColor.r, overlayColor.g, overlayColor.b, 255 * 0.5);
    cursor('default');
    fill(shadowColor);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2 + this.shadowOffsetTop, w, h, 60);
    fill(colors.boogerTwo);
    rect(width / 2, height / 2, w, h, 60);
    
    if(windowWidth > 800) {
      image(dancer, width / 2 - w / 2 + 370, height / 2 - h / 2 + marginTop, 150, 200);
    }


    fill(255);
    textSize(fs);

    textLeading(lh);
    textFont(this.font);
    if(!(windowWidth <= 800)) {
      text('umaRlesi qula: 547\nqula: ' + this.score +'\nTavidan\ngamorTva', width / 2 - w / 2 + ml, height / 2 - h / 2 + mt);
      text('gaaziare', width / 2 - w / 2 + 350, height / 2 - h / 2 + mt + 3 * lh);
    } else {
      text('umaRlesi qula: 547\nqula: ' + this.score +'\nTavidan\ngamorTva\ngaaziare', width / 2 - w / 2 + ml, height / 2 - h / 2 + mt);
    }

    //Buttons
    this.statButtons.forEach(function(btn) {
      btn.update();
      btn.draw();
    });

    pop();
  }

  this.drawQuit = function() {
    var coef = 1;
    var fs = this.fontSize;
    var w = this.width;
    var hgt = this.height;
    
    this.quitButtons[0].onUpdate = function() {
      this.x = width / 2 - oModal.width / 2 + 100 * coef;
      this.y = height / 2 + 70 * coef;
    };
    this.quitButtons[1].onUpdate = function() {
      this.x = width / 2 + oModal.width / 2 - 100 * coef;
      this.y = height / 2 + 70 * coef;
    };

    if(windowWidth <= 800) {
      coef = 0.8;
      fs = parseInt(fs * coef);
      w = parseInt(w * 0.75);

      this.quitButtons[0].onUpdate = function() {
        this.x = width / 2;
        this.y = height / 2 + oModal.height / 2 - this.height * 2 - 20;
      };
      this.quitButtons[1].onUpdate = function() {
        this.x = width / 2;
        this.y = height / 2 + oModal.height / 2 - this.height;
      };
    }

    push();

    //Modal Box
    background(overlayColor.r, overlayColor.g, overlayColor.b, 255 * 0.5);
    fill(shadowColor);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2 + this.shadowOffsetTop, w, hgt, 40);
    fill(colors.boogerTwo);
    rect(width / 2, height / 2, w, hgt, 40);

    //Modal Text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(fs);
    textLeading(35);
    textFont(this.font);
    text('namdvilad ginda\nTamaSis gamorTva?', width / 2, height / 2 - hgt / 2 + 70);

    //Buttons
    this.quitButtons.forEach(function(btn) {
      btn.update();
      btn.draw();
    });

    pop();
  }

  this.drawPause = function() {
    var coef = 1;
    var w = this.width;
    var h = this.height;
    var fs = this.fontSize;
    var iconSize = 1;

    if(windowWidth <= 800) {
      coef = 0.7;
      w = parseInt(w * 0.5);
      fs = parseInt(fs * 0.5);
      h = parseInt(h * 0.5);
      iconSize = 0.5
    }

    this.resumeBtn.onUpdate = function() {
      this.x = width / 2 + resumeTextWidth / 2 + 20;
      this.y = height / 2;
      this.w = icons.resume.w * iconSize;
      this.w = icons.resume.h * iconSize;
    }

    push();

    background(overlayColor.r, overlayColor.g, overlayColor.b, 255 * 0.5);
    fill(shadowColor);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2 + this.shadowOffsetTop, w, h, 40);
    fill(colors.boogerTwo);
    rect(width / 2, height / 2, w, h, 40);

    //Modal Text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(fs);
    textLeading(35);
    textFont(this.font);
    text(resumeText, width / 2 - 20, height / 2);
    resumeTextWidth = textWidth(resumeText)

    this.resumeBtn.update();
    this.resumeBtn.draw();

    pop();
  }

  this.setScore = function(value) {
    this.score = value;
  } 
}