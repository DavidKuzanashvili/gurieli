function Modal(options) {
  options = options || {};
  var oModal = this;
  this.backgroundColor = options.backgroundColor || colors.dullYellow;
  this.shadowOffsetTop = options.shadowOffsetTop || 20;
  this.width = options.width || 419;
  this.height = options.height || 529;
  this.fontSize = options.fontSize || 40;
  this.font = options.font || fonts.LGVBold;
  this.score = 0;
  this.resetBtn = null;
  this.closeBtn = null;
  this.shareBtn = null;
  var shadowColor = darken(color(this.backgroundColor));
  var marginLeft = 50;
  var marginTop = 80;
  var lineHeight = 90;
  var overlayColor = hexToRgb(colors.seafoamBlueTwo);
  var resumeText = 'TamaSis gagrZeleba';
  var resumeTextWidth;
  var statButtonOffsetX = 40;
  var overlayColor = hexToRgb(colors.seafoamBlueTwo);

  this.resetBtn = new ControlButton(pngIcons.reset.img, width / 2 + statButtonOffsetX, height / 2 - this.height / 2 + marginTop + 2 * lineHeight, pngIcons.reset.w, pngIcons.reset.h, 'reset');

  this.closeBtn = new ControlButton(pngIcons.close.img, width / 2 + statButtonOffsetX, height / 2 - this.height / 2 + marginTop + 3 * lineHeight, pngIcons.close.w, pngIcons.close.h, 'close');

  this.shareBtn = new ControlButton(pngIcons.share.img, width / 2 + statButtonOffsetX, height / 2 - oModal.height / 2 + marginTop + 4 * lineHeight, pngIcons.share.w, pngIcons.share.h, 'share');


  this.statButtons = [
    this.resetBtn,
    this.closeBtn,
    this.shareBtn
  ];

  this.quitButtons = [
    new Button({
      color: 'black',
      backgroundColor: color(colors.beige),
      content: 'ki',
      width: 130,
      height: 70,
      shadowOffset: 15,
      fontSize: 30,
      speed: 2
    }),
    new Button({
      backgroundColor: color(colors.seafoamBlueTwo),
      content: 'ara',
      width: 130,
      height: 70,
      shadowOffset: 15,
      fontSize: 30,
      speed: 2
    })
  ];

  this.resumeBtn = new ControlButton(pngIcons.resume.img, width / 2 + resumeTextWidth / 2 + 20, height / 2, pngIcons.resume.w, pngIcons.resume.h, 'resume');

  
  this.drawStats = function() {
    var w = this.width;
    var h = this.height;
    var fs = this.fontSize;
    var mt = marginTop;
    var lh = lineHeight;
    var ml = marginLeft;
    var coef = 1;
    this.resetBtn.onUpdate = function() {
      this.x = width / 2 + statButtonOffsetX;
      this.y = height / 2 - h / 2 + (mt + 2 * lh);
      this.w = pngIcons.reset.w * coef;
      this.h = pngIcons.reset.h * coef;
    }

    this.closeBtn.onUpdate = function() {
      this.x = width / 2 + statButtonOffsetX;
      this.y = height / 2 - h / 2 + (mt + 3 * lh);
      this.w = pngIcons.close.w * coef;
      this.h = pngIcons.close.h * coef;
    }

    this.shareBtn.onUpdate = function() {
      this.x = width / 2 + statButtonOffsetX;
      this.y = height / 2 - h / 2 + (mt + 4 * lh);
      this.w = pngIcons.share.w * coef;
      this.h = pngIcons.share.h * coef;
    }

    if(windowWidth <= 800) {
      coef = 0.7;
      w = parseInt(w * 0.65);
      h = parseInt(h * coef);
      fs = parseInt(fs * coef);
      mt = parseInt(mt * 0.55);
      lh = parseInt(lh * coef);
      ml = parseInt(ml * coef);
    }

    push();

    background(overlayColor.r, overlayColor.g, overlayColor.b, 255*0.5);
    cursor('default');
    fill(shadowColor);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2 + this.shadowOffsetTop, w, h, 60);
    fill(this.backgroundColor);
    rect(width / 2, height / 2, w, h, 60);
    fill(255);
    textSize(fs);

    textFont(this.font);
    textAlign(LEFT, CENTER);
    fill(colors.sickGreen);
    text('umaRlesi qula: 57', width / 2 - w / 2 + ml, height / 2 - h / 2 + mt);
    fill(255);
    text('qula: ' + this.score, width / 2 - w / 2 + ml, height / 2 - h / 2 + mt + lh);
    fill(colors.sickGreen);
    text('Tavidan ', width / 2 - w / 2 + ml, height / 2 - h / 2 + mt + 2 * lh);
    text('gamorTva ', width / 2 - w / 2 + ml, height / 2 - h / 2 + mt + 3 * lh);
    fill(colors.frenchBlue);
    text('gaaziare ', width / 2 - w / 2 + ml, height / 2 - h / 2 + mt + 4 * lh);

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
    var h = this.height;
    
    this.quitButtons[0].onUpdate = function() {
      this.fontSize = fs;
      this.x = width / 2 - oModal.width / 2 + 100 * coef;
      this.y = height / 2 + 70 * coef;
    };
    this.quitButtons[1].onUpdate = function() {
      this.fontSize = fs;
      this.x = width / 2 + oModal.width / 2 - 100 * coef;
      this.y = height / 2 + 70 * coef;
    };

    if(windowWidth > 500 && windowWidth <= 800) {
      coef = 0.8;
      fs = parseInt(fs * coef);
      w = parseInt(w * 0.75);

      this.quitButtons[0].onUpdate = function() {
        this.fontSize = fs;
        this.height = 60;
        this.x = width / 2;
        this.y = height / 2 + oModal.height / 2 - this.height * 2 - 20;
      };
      this.quitButtons[1].onUpdate = function() {
        this.fontSize = fs;
        this.height = 60;
        this.x = width / 2;
        this.y = height / 2 + oModal.height / 2 - this.height;
      };
    }

    if(windowWidth <= 500) {
      coef = 0.6;
      fs = parseInt(fs * coef);
      w = parseInt(w * 0.6);

      this.quitButtons[0].onUpdate = function() {
        this.fontSize = fs;
        this.height = 60;
        this.x = width / 2;
        this.y = height / 2 + oModal.height / 2 - this.height * 2 - 20;
      };
      this.quitButtons[1].onUpdate = function() {
        this.fontSize = fs;
        this.height = 60;
        this.x = width / 2;
        this.y = height / 2 + oModal.height / 2 - this.height;
      };
    }

    push();

    background(overlayColor.r, overlayColor.g, overlayColor.b, 255*0.5);

    //Modal Box
    fill(shadowColor);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2 + this.shadowOffsetTop, w, h, 40);
    fill(this.backgroundColor);
    rect(width / 2, height / 2, w, h, 40);

    //Modal Text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(fs);
    textLeading(35);
    textFont(this.font);
    text('namdvilad ginda\nTamaSis gamorTva?', width / 2, height / 2 - h / 2 + 70);

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

    if(windowWidth > 500 && windowWidth <= 800) {
      coef = 0.65;
      w = parseInt(w * coef);
      fs = parseInt(fs * coef);
      h = parseInt(h * coef);
      iconSize = coef
    }

    if(windowWidth <= 500) {
      coef = 0.5;
      w = parseInt(w * coef);
      fs = parseInt(fs * coef);
      h = parseInt(h * coef);
      iconSize = coef
    }

    this.resumeBtn.onUpdate = function() {
      this.x = width / 2 + resumeTextWidth / 2 + 20;
      this.y = height / 2;
      this.w = pngIcons.resume.w * iconSize;
      this.w = pngIcons.resume.h * iconSize;
    }

    push();

    background(overlayColor.r, overlayColor.g, overlayColor.b, 255 * 0.5);
    fill(shadowColor);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2 + this.shadowOffsetTop, w, h, 40);
    fill(colors.boogerTwo);
    fill(this.backgroundColor);
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
}