function drawWonState() {
  textAlign(CENTER);
  textSize(32);
  fill(33);
  text('You won', width / 2, height / 2);
  text(`Level ${CURRENT_LEVEL + 1}`, width / 2, 60);
}