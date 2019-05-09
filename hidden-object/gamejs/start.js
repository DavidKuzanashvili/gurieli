var bkImg;
var hiddenObjects = [];

function preload() {
  bkImg = loadImage('assets/img/bk.jpg');
  hiddenObjects = [loadImage('assets/img/apple.png'), loadImage('assets/img/lemon.png')];
}

function setup() {
  var canvas = createCanvas(bkImg.width, bkImg.height);
  canvas.parent('game');
  var mgr = new SceneManager();
  mgr.bkImg = bkImg;
  mgr.hiddenObjects = hiddenObjects;
  mgr.wire();
  mgr.showScene( Intro );
}