function Top(options) {
  options = options || {};
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.height = options.height || 200;
  this.width = options.width || 16;
  this.color = color(options.color || 'red');
  this.shadowOffset = options.shadowOffset || 10;

  var content = null;
  var contentBackground = color(255);

  this.draw = function () {
    push();

    rectMode(CENTER);
    noStroke();

    fill(this.getShadowColor());
    rect(this.x, this.y + this.shadowOffset, this.width, this.height, 20);

    fill(this.color);
    rect(this.x, this.y, this.width, this.height, 20);

    fill(contentBackground);
    rect(this.x, this.y, this.width, this.height - 200);
    if (content !== null) {
      image(content, this.x - this.width / 2 + 64, this.y - this.height / 3, content.width, content.height, 0, 0, content.width, content.height);
    }

    pop();
  }

  this.getShadowColor = function () {
    return darken(this.color);
  }

  this.update = function () {
  }

  var topBackgroundColors = [
    '#f8dd7b',
    '#86b23d',
    '#86b23d'
  ]

  this.setData = function (data) {
    var h = (this.height - 240) / 5;
    var w = Math.round(this.width * 0.75);
    var mt = 20;
    var r = 20;
    var em = 15;
    var eShadowOffset = 10;
    content = createGraphics(w, h * data.length + mt * data.length);

    content.clear();
    content.noStroke();
    content.ellipseMode(CORNER);
    content.rectMode(CORNER);
    content.background(contentBackground);

    for (var i = 0; i < data.length; i++) {
      if (i < topBackgroundColors.length) {
        var y = i * h + i * mt;
        var fontSize = Math.round(h / 4);
        var textY = y + h / 2 + eShadowOffset / 2 - Math.round(fontSize / 2);
        content.fill(darken(color(topBackgroundColors[i])));
        content.rect(0, y + 10, w, h, r);

        content.fill(contentBackground);
        content.rect(0, y, w, h, r);

        content.fill(darken(color(topBackgroundColors[i])));
        content.ellipse(em, y + em + eShadowOffset, h - em * 2);
        content.textAlign(CENTER, CENTER);

        content.fill(topBackgroundColors[i]);
        content.ellipse(em, y + em, h - em * 2);

        content.fill(contentBackground);
        content.textAlign(CENTER, CENTER);
        content.textSize(fontSize);
        content.text(i + 1, h / 2, y + h / 2);

        content.fill(topBackgroundColors[i]);
        content.textAlign(LEFT, TOP);
        content.textSize(fontSize);
        content.text(data[i].title, h, textY, Math.round(w * 0.7) - h - 30, fontSize);

        content.textAlign(RIGHT, TOP);
        content.textSize(fontSize);
        content.text('ქულა: ' + data[i].score, Math.round(w * 0.7) - 10, textY, Math.round(w * 0.3), fontSize);
      } else {
        var y = (topBackgroundColors.length) * h + (i - topBackgroundColors.length) * h / 2 + i * mt / 2 + h / 4;
        var fontSize = Math.round(h / 4);
        var textY = y + h / 2 + eShadowOffset / 2 - Math.round(fontSize / 2);

        content.fill('#999');
        content.textAlign(CENTER, CENTER);
        content.textSize(fontSize);
        content.text(i + 1, h / 2, y + h / 2);

        content.fill('#999');
        content.textAlign(LEFT, TOP);
        content.textSize(fontSize);
        content.text(data[i].title, h, textY, Math.round(w * 0.7) - h - 30, fontSize);

        content.textAlign(RIGHT, TOP);
        content.textSize(fontSize);
        content.text('ქულა: ' + data[i].score, Math.round(w * 0.7) - 10, textY, Math.round(w * 0.3), fontSize);
      }
    }
  }
}