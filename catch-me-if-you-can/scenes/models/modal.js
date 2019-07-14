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
  this.xushturi = null;
  var shadowColor = darken(color(colors.boogerTwo));
  var marginLeft = 50;
  var marginTop = 100;
  var resumeText = 'TamaSis gagrZeleba';
  var resumeTextWidth;
  var overlayColor = hexToRgb(colors.darkForestGreen);
  var lines = 'umaRlesi qula: 547\nqula: ' + this.score +'\nTavidan\ngamorTva';
  var controlButtonsOffsetX = textWidth('gamorTva') * this.fontSize / 12;
  var lineHeight = 90;
  this.statResetButton = new ControlButton(pngIcons.reset.img, width / 2, height / 2, pngIcons.reset.w, pngIcons.reset.h, 'reset');
  this.statResetButton.typeText = 'reset';
  
  this.statCloseButton = new ControlButton(pngIcons.close.img, width / 2, height / 2, pngIcons.close.w, pngIcons.close.h, 'close');
  this.statCloseButton.typeText = 'close';
  
  this.statShareButton = new ControlButton(pngIcons.share.img, width / 2, height / 2, pngIcons.share.w, pngIcons.share.h, 'share');
  this.statShareButton.typeText = 'share';
  
  this.statButtons = [
    this.statResetButton,
    this.statCloseButton,
    this.statShareButton
  ];

  this.quitButtons = [
    new Button({
      color: 'black',
      backgroundColor: color(colors.beige),
      content: 'ki',
      width: 150,
      height: 60,
      shadowOffset: 7,
      fontSize: 30
    }),
    new Button({
      backgroundColor: color(colors.sand),
      content: 'ara',
      width: 150,
      height: 60,
      shadowOffset: 7,
      fontSize: 30
    })
  ];

  this.resumeBtn = new ControlButton(pngIcons.resume.img, width / 2 + resumeTextWidth / 2 + 20, height / 2, pngIcons.resume.w, pngIcons.resume.h, 'resume');
  this.resumeBtn.typeText = 'resume';
  
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
      this.w = pngIcons.reset.w * coef;
      this.h = pngIcons.reset.h * coef;
    }
    this.statCloseButton.onUpdate = function() {
      this.x = width / 2 - w / 2 + controlButtonsOffsetX + this.w + 20;
      this.y = height / 2 - h / 2 + this.w / 2 - this.h / 2 + (mt + 3 * lh) - 15 * coef;
      this.w = pngIcons.close.w * coef;
      this.h = pngIcons.close.h * coef;
    }
    this.statShareButton.onUpdate = function() {
      this.x = width / 2 + controlButtonsOffsetX + 50;
      this.y = height / 2 - h / 2 + this.w / 2 - this.h / 2 + (mt + 3 * lh) - 15;
      this.w = pngIcons.share.w * coef;
      this.h = pngIcons.share.h * coef;
    }

    if(sizes.modalMobile){
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
        this.w = pngIcons.share.w * coef;
        this.h = pngIcons.share.h * coef;
      }
    }
    
    push();

    background(overlayColor.r, overlayColor.g, overlayColor.b, 255 * 0.6);
    cursor('default');
    fill(shadowColor);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2 + this.shadowOffsetTop, w, h, 60);
    fill(colors.boogerTwo);
    rect(width / 2, height / 2, w, h, 60);
    if(!sizes.modalMobile && this.xushturi) {
      this.xushturi.translateX = width / 2 - w / 2 + 350;
      this.xushturi.translateY = height / 2 - h / 2 + marginTop;
      this.xushturi.update();
      this.xushturi.draw();
    }
    fill(255);
    textSize(fs);

    textLeading(lh);
    textFont(this.font);
    if(!sizes.modalMobile) {
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
    var h = this.height;
    
    this.quitButtons[0].onUpdate = function() {
      this.x = width / 2 - oModal.width / 2 + 100 * coef;
      this.y = height / 2 + 70 * coef;
    };
    this.quitButtons[1].onUpdate = function() {
      this.x = width / 2 + oModal.width / 2 - 100 * coef;
      this.y = height / 2 + 70 * coef;
    };

    if(sizes.modalMobile) {
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

    background(overlayColor.r, overlayColor.g, overlayColor.b, 255 * 0.6);
    //Modal Box
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
    text('namdvilad ginda\nTamaSis gamorTva?', width / 2, height / 2 - h / 2 + 70);

    //Buttons
    this.quitButtons.forEach(function(btn) {
      btn.update();
      btn.draw();
    });

    pop();
  }

  var w = this.width;
  var h = this.height;

  this.drawPause = function() {
    push();

    var coef = 1;
    var fs = this.fontSize;
    var iconSize = 1;

    if(sizes.modalMobile) {
      coef = 0.7;
      w = parseInt(w * 0.5);
      fs = parseInt(fs * 0.5);
      h = parseInt(h * 0.5);
      iconSize = 0.5
    }

    this.resumeBtn.onUpdate = function() {
      this.x = width / 2 + resumeTextWidth / 2 + 20;
      this.y = height / 2;
      this.w = pngIcons.resume.w * iconSize;
      this.w = pngIcons.resume.h * iconSize;
    }

    background(overlayColor.r, overlayColor.g, overlayColor.b, 255 * 0.6);

    if(this.pauseContains(mouseX, mouseY)) {
      cursor('pointer');
    }

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

  this.pauseContains = function(x, y) {
    var pw = w / 2;
    var ph = h / 2;
    var px = width / 2;
    var py = height / 2;

    console.log(pw, ph, px, py);  

    return x > px - pw
      && x < px + pw
      && y > py - ph
      && y < py + ph;
  }
}