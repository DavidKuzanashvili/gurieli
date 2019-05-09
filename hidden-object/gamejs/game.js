function Game() {
  var placeHiddenObjects = [
    {
      x: random(width * 2 / 3, width),
      y: random(height - (height * 2 / 3))
    },
    {
      x: random(width * 2 / 3, width),
      y: random(height - (height * 2 / 3))
    }
  ];

  var score = 0;

  this.draw = function() {
    push();

    image( this.sceneManager.bkImg, 0, 0 );

    placeObjects(this.sceneManager.hiddenObjects);

    pop();
  }

  this.mouseClicked = function() {
    var omitObject = detectClickedObject();

    if(score >= 2) {
      this.sceneManager.showScene( GameOver );
    }

    if(omitObject.inSight) {
      this.sceneManager.hiddenObjects.splice(omitObject.index, 1);
      placeHiddenObjects.splice(omitObject.index, 1);
      score++;
    }
  }

  this.getScore = function() {
    return score;
  }

  function placeObjects(imgArray) {
    for(var i = 0; i < imgArray.length; i++) {
      for(var j = 0; j < placeHiddenObjects.length; j++) {
        fill(0);
        image(imgArray[i], placeHiddenObjects[i].x, placeHiddenObjects[i].y, 25, 25);
      }
    }
  }

  function detectClickedObject() {
    for(var i = 0; i < placeHiddenObjects.length; i++) {
      if(
        mouseX > placeHiddenObjects[i].x && mouseX < (placeHiddenObjects[i].x + 25)
        && mouseY > placeHiddenObjects[i].y && mouseY < (placeHiddenObjects[i].y + 25)
        ) {
          return {
            inSight: true,
            index: i
          };
      }
    }
            
    return {
      inSight: false,
      index: -1
    };
  }
}