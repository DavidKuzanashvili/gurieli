function Leaves(leavesType) {
  this.leavesType = leavesType;

  this.draw = function() {
    push();

    image(leavesImages[this.leavesType], 0, 0, width, 300);

    pop();
  }
}