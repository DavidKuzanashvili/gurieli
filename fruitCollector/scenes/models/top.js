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

  var headerHeight = 100;
  var speedY = 10;
  var innerScroll = 0;
  var targetInnerScroll = innerScroll;

  var makeEven = function (x) {
    if (x % 2) {
      return x - 1;
    }

    return x;
  }

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
      image(content, this.x - this.width / 2 + 64, Math.round(this.y - this.height / 2 + headerHeight), content.width, this.height - 200, 0, innerScroll, content.width, this.height - 200);
    }

    var scrollerX = round(this.x + this.width / 2 - 50);
    var scrollerHeight = round((this.height - 200) * 0.8);
    var scrollerBarHeight = round(scrollerHeight * 0.4);
    var scrollerWidth = 8;
    var scrollerbarMinY = round(this.y - scrollerHeight / 2 + scrollerBarHeight / 2);
    var scrollerBarY = scrollerbarMinY + round(innerScroll / (content.height - (this.height - 200)) * (scrollerHeight - scrollerBarHeight));

    fill(this.color);
    rect(scrollerX, this.y, scrollerWidth, scrollerHeight, scrollerWidth);

    fill(this.getShadowColor());
    rect(scrollerX, scrollerBarY, scrollerWidth, scrollerBarHeight, scrollerWidth);

    pop();
  }

  this.getShadowColor = function () {
    return darken(this.color);
  }

  this.update = function () {
    if (innerScroll !== targetInnerScroll) {
      var calculatedSpeed = Math.max(Math.abs(innerScroll - targetInnerScroll) / 10, speedY);

      if (innerScroll > targetInnerScroll) {
        innerScroll = Math.max(innerScroll - calculatedSpeed, targetInnerScroll);
      } else {
        innerScroll = Math.min(innerScroll + calculatedSpeed, targetInnerScroll);
      }
    }
  }

  this.mouseWheel = function (event) {
    targetInnerScroll = max(min(targetInnerScroll + event.delta, content.height - (this.height - 200)), 0);
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
    var padding = h / 4;
    content = createGraphics(w, topBackgroundColors.length * h + topBackgroundColors.length * mt + (data.length - topBackgroundColors.length) * h / 2 + (data.length - topBackgroundColors.length) * mt / 2 + padding * 2);

    content.clear();
    content.noStroke();
    content.ellipseMode(CORNER);
    content.rectMode(CORNER);
    content.background(contentBackground);

    for (var i = 0; i < data.length; i++) {
      if (i < topBackgroundColors.length) {
        var y = i * h + i * mt + padding;
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
        var y = topBackgroundColors.length * h + topBackgroundColors.length * mt + (i - topBackgroundColors.length) * h / 2 + (i - topBackgroundColors.length) * mt / 2 + padding;
        var fontSize = Math.round(h / 4);
        var textY = y + h / 2 + eShadowOffset / 2 - Math.round(fontSize / 2);

        content.fill('#999');
        content.textAlign(LEFT, TOP);
        content.textSize(fontSize);
        content.text(i + 1, h / 2 - fontSize / 4, textY);

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

  this.install = function (oScene) {
    if (typeof oScene.mouseWheel === 'function') {
      var cb = oScene.mouseWheel;
      oScene.mouseWheel = function () {
        var args = [].map.call(arguments, function (x) {
          return x;
        });

        cb.apply(oScene, args);
        me.mouseWheel.apply(me, args)
      }
    } else {
      var me = this;
      oScene.mouseWheel = function () {
        var args = [].map.call(arguments, function (x) {
          return x;
        });

        me.mouseWheel.apply(me, args);
      }
    }
  }
}