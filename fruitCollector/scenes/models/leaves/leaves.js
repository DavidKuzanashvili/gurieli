function Leaves(leavesType) {
  this.leavesType = leavesType;

  this.draw = function() {
    push();

    image(this.leavesType, 0, 0, width, 300);

    pop();
  }
}