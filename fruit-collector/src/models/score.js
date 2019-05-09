class Score {
  constructor() {
    this.score = 0;
    this.x = 100;
    this.y = 60;
  }

  draw() {
    push();

    textAlign(CENTER);
    textSize(32);
    fill(33);
    text(`SCORE ${this.score}`, this.x, this.y);

    pop();
  }
}