function Game() {
  var header = null;
  var oDancer = null;
  var controlColumns = [];

  this.enter = function() {
    initGame();
  }

  this.draw = function() {
    push();

    background(colors.lightTan);
    drawHeader();
    drawDancer();
    drawControlColumns();

    pop();
  }

  function initGame() {
    header = new Header();
    oDancer = new Dancer(dancer);
    controlColumns.push(new ControlColumn('^', width / 2));
    controlColumns.push(new ControlColumn('<', width / 2 + (width / 8)));
    controlColumns.push(new ControlColumn('|', width / 2 + 2*(width / 8)));
    controlColumns.push(new ControlColumn('>', width / 2 + 3*(width / 8)));
  }

  function drawHeader() {
    header.draw();
  }

  function drawDancer() {
    oDancer.draw();
  }

  function drawControlColumns() {
    controlColumns.forEach(function(column) {
      column.draw();
    });
  }

  this.mousePressed = function() {
    var headerButtons = header.btns;
    headerButtons.forEach(function(btn) {
      if(btn.contains(mouseX, mouseY)) {
        btn.animate('down');
      }
    });

    controlColumns.forEach(function(column) {
      if(column.btn.contains(mouseX, mouseY)) {
        column.btn.animate('down');
      }
    });
  }
}