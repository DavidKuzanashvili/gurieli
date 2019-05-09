class Bottle {
  constructor(x) {
    this.x = x;
  }

  draw() {
    
    noStroke();

    beginShape();
    curveVertex(84, 30);
    curveVertex(84, 91);
    curveVertex(32, 91);
    curveVertex(32, 30);
    endShape();

    rectMode(CORNER);
    rect(32, 19, 82 - 30, 91 - 19);

    beginShape();
    curveVertex(84, 91);
    curveVertex(84, 20);
    curveVertex(32, 20);
    curveVertex(32, 91);
    endShape();

    
    strokeWeight(5);
    point(84, 91);
    point(84, 19);
    point(32, 19);
    point(32, 91);
    strokeWeight(1);
  }
}