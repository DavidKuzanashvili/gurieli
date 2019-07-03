function Modal(options) {
  options = options || {};
  var oModal = this;
  this.backgroundColor = options.backgroundColor || colors.sand;
  this.shadowOffsetTop = options.shadowOffsetTop || 20;
  this.width = options.width || 640;
  this.height = options.height || 480;
  this.fontSize = options.fontSize || 40;
  this.font = options.font || fonts.LGVBold;
  this.score = 0;
  var shadowColor = darken(color(this.backgroundColor));
  var marginLeft = 50;
  var marginTop = 100;
  var lines = 'umaRlesi qula: 3224\nqula: ' + this.score +'\nTavidan\ngamorTva';
  var lineHeight = 90;
  this.statButtons = [
    new Button({ 
      backgroundColor: color(colors.lipstick),
      type: "R",
      content: icons.reload, 
      width: 50, 
      height: 50, 
      shadowOffset:6,
      fontSize: 16,
      onUpdate: function() {
        this.x = width / 2 - oModal.width / 2 + 250;
        this.y = height / 2 - oModal.height / 2 + marginTop + 2 * lineHeight - 15;
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
        this.x = width / 2 - oModal.width / 2 + 250;
        this.y = height / 2 - oModal.height / 2 + marginTop + 3 * lineHeight - 15;
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
        this.x = width / 2 + 230;
        this.y = height / 2 - oModal.height / 2 + marginTop + 3 * lineHeight - 15;
      }
    })
  ];
  this.quitButtons = [
    new Button({
      color: 'black',
      backgroundColor: color(colors.beige),
      content: 'ki',
      width: 150,
      height: 60,
      shadowOffset: 7,
      fontSize: 30,
      onUpdate: function() {
        this.x = width / 2 - oModal.width / 2 + 100;
        this.y = height / 2 + 70;
      }
    }),
    new Button({
      backgroundColor: color(colors.sand),
      content: 'ara',
      width: 150,
      height: 60,
      shadowOffset: 7,
      fontSize: 30,
      onUpdate: function() {
        this.x = width / 2 + oModal.width / 2 - 100;
        this.y = height / 2 + 70;
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

    cursor('default');
    fill(shadowColor);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2 + this.shadowOffsetTop, this.width, this.height, 60);
    fill(this.backgroundColor);
    rect(width / 2, height / 2, this.width, this.height, 60);
    // image(xushturi, width / 2 - this.width / 2 + 350, height / 2 - this.height / 2 + marginTop);
    fill(255);
    textSize(this.fontSize);

    textLeading(lineHeight);
    textFont(this.font);
    text('umaRlesi qula: 3224\nqula: ' + this.score +'\nTavidan\ngamorTva', width / 2 - this.width / 2 + marginLeft, height / 2 - this.height / 2 + marginTop);
    text('gaaziare', width / 2 - this.width / 2 + 350, height / 2 - this.height / 2 + marginTop + 3 * lineHeight);

    //Buttons
    this.statButtons.forEach(function(btn) {
      btn.update();
      btn.draw();
    });

    pop();
  }

  this.drawQuit = function() {
    push();

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