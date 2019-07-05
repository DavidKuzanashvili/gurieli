function Modal(options) {
  options = options || {};
  var oModal = this;
  this.backgroundColor = options.backgroundColor || colors.sand;
  this.shadowOffsetTop = options.shadowOffsetTop || 20;
  this.width = options.width || 419;
  this.height = options.height || 529;
  this.fontSize = options.fontSize || 40;
  this.font = options.font || fonts.LGVBold;
  this.score = 0;
  var shadowColor = darken(color(this.backgroundColor));
  var marginLeft = 50;
  var marginTop = 80;
  var lineHeight = 90;
  var statButtonOffsetX = 40;
  var overlayColor = hexToRgb(colors.seafoamBlueTwo);
  this.statButtons = [
    new Button({ 
      backgroundColor: color(colors.seafoamBlueTwo),
      type: "R",
      content: icons.reload, 
      width: 50, 
      height: 50, 
      shadowOffset:6,
      fontSize: 16,
      onUpdate: function() {
        this.x = width / 2 + statButtonOffsetX;
        this.y = height / 2 - oModal.height / 2 + marginTop + 2 * lineHeight;
      }
    }),
    new Button({ 
      backgroundColor: color(colors.booger),
      type: "X",
      content: icons.close, 
      width: 50, 
      height: 50, 
      shadowOffset:6,
      fontSize: 16,
      onUpdate: function() {
        this.x = width / 2 + statButtonOffsetX;
        this.y = height / 2 - oModal.height / 2 + marginTop + 3 * lineHeight;
      }
    }),
    new Button({
      backgroundColor: color('#3C5A99'),
      type: 'f',
      content: icons.fb,
      width: 50,
      height: 50,
      shadowOffset: 6,
      fontSize: 25,
      onUpdate: function() {
        this.x = width / 2 + statButtonOffsetX;
        this.y = height / 2 - oModal.height / 2 + marginTop + 4 * lineHeight;
      }
    })
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
      speed: 2,
      onUpdate: function() {
        this.x = width / 2 - oModal.width / 2 + 110;
        this.y = height / 2 + 60;
      }
    }),
    new Button({
      backgroundColor: color(colors.seafoamBlueTwo),
      content: 'ara',
      width: 130,
      height: 70,
      shadowOffset: 15,
      fontSize: 30,
      speed: 2,
      onUpdate: function() {
        this.x = width / 2 + oModal.width / 2 - 110;
        this.y = height / 2 + 60;
      }
    })
  ];
  this.pauseButton = new Button({
    backgroundColor: color(colors.beige),
    color: color(colors.darkForestGreen),
    content: '>',
    width: 50,
    height: 50,
    shadowOffset: 5,
    fontSize: 20,
    onUpdate: function() {
      this.x = width / 2;
      this.y = height / 2 + 70;
    }
  })
  
  this.drawStats = function() {
    push();

    background(overlayColor.r, overlayColor.g, overlayColor.b, 255*0.5);
    cursor('default');
    fill(shadowColor);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2 + this.shadowOffsetTop, this.width, this.height, 60);
    fill(this.backgroundColor);
    rect(width / 2, height / 2, this.width, this.height, 60);
    fill(255);
    textSize(this.fontSize);

    textFont(this.font);
    textAlign(LEFT, CENTER);
    text('umaRlesi qula: 3224', width / 2 - this.width / 2 + marginLeft, height / 2 - this.height / 2 + marginTop);
    text('qula: ' + this.score, width / 2 - this.width / 2 + marginLeft, height / 2 - this.height / 2 + marginTop + lineHeight);
    text('Tavidan ', width / 2 - this.width / 2 + marginLeft, height / 2 - this.height / 2 + marginTop + 2 * lineHeight);
    text('gamorTva ', width / 2 - this.width / 2 + marginLeft, height / 2 - this.height / 2 + marginTop + 3 * lineHeight);
    text('gaaziare ', width / 2 - this.width / 2 + marginLeft, height / 2 - this.height / 2 + marginTop + 4 * lineHeight);

    this.statButtons.forEach(function(btn) {
      btn.update();
      btn.draw();
    });

    pop();
  }

  this.drawQuit = function() {
    push();

    background(overlayColor.r, overlayColor.g, overlayColor.b, 255*0.5);

    //Modal Box
    fill(shadowColor);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2 + this.shadowOffsetTop, this.width, this.height, 40);
    fill(this.backgroundColor);
    rect(width / 2, height / 2, this.width, this.height, 40);

    //Modal Text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(this.fontSize);
    textLeading(35);
    textFont(this.font);
    text('namdvilad ginda\nTamaSis gamorTva?', width / 2, height / 2 - this.height / 2 + 70);

    //Buttons
    this.quitButtons.forEach(function(btn) {
      btn.update();
      btn.draw();
    });

    pop();
  }

  this.drawPause = function() {
    push();
    
    background(overlayColor.r, overlayColor.g, overlayColor.b, 255*0.5);

    fill(shadowColor);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2 + this.shadowOffsetTop, this.width, this.height, 40);
    fill(this.backgroundColor);
    rect(width / 2, height / 2, this.width, this.height, 40);

    //Modal Text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(this.fontSize);
    textLeading(35);
    textFont(this.font);
    text('TamaSis gagrZeleba', width / 2, height / 2 - this.height / 2 + 70);

    this.pauseButton.update();
    this.pauseButton.draw();

    pop();
  }
}