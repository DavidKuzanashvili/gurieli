const fruits = [];
let bucket = null;
let bottle = null;
let drawScore = null;
let score = 0;
const fruitModels = {};
let fruitAddLastTime = 0;
const LEVELS = [
  {
    fruit: {
      speed: 2,
      models: ['apple']
    },
    capacity: 5,
  },
  {
    fruit: {
      speed: 5,
      models: ['apple', 'lemon']
    },
    capacity: 7,
  }
];
let CURRENT_LEVEL;

let gameState = 'playing';
let pause = false;
let catSprite;
let catModel;
let movingDirection = 'RIGHT';

function preload() {
  fruitModels.apple = loadImage('./assets/static/img/apple.png');
  fruitModels.lemon = loadImage('./assets/static/img/lemon.png');
  catSprite = loadImage('./assets/static/img/cat.png');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch');

  catModel = new Model(new Frame(), catSprite);
  for(let i = 0; i < 8; i++) {
    let x = (i % 4) * 512;
    let y = parseInt(i / 4) * 256;
    catModel.frame.sequence.push(new Sprite(x, y, 512, 256));
  }
  catModel.frame.addAnimation('moving', 0, 7);
  catModel.animate('moving', 100);

  rectMode(CENTER);
  imageMode(CENTER);
  CURRENT_LEVEL = 0;
  setupNewGame();
}

function setupNewGame(){
  bucket = new Bucket(width / 2);
  drawScore = new Score();
  drawScore.score = score; 
  fruits.length = 0;
}

function draw() {
  background(220);

  // catModel.update();
  // catModel.draw();
  // if(false)
  switch(gameState) {
    case 'playing':
      drawPlayingScene();
      break;
    case 'won':
      drawWonState();
      break;
  }
}

function keyPressed(){
  if(keyCode === LEFT_ARROW) {
    movingDirection = 'LEFT';
  }
  if(keyCode === RIGHT_ARROW) {
    movingDirection = 'RIGHT';
  }

  if(['won', 'loose'].includes(gameState) && keyCode === 32) {
    CURRENT_LEVEL = Math.min(CURRENT_LEVEL + 1, LEVELS.length - 1);
    setupNewGame();
    gameState = 'playing';
  }

  if(keyCode === ESCAPE) {
    pause = !pause;
    
    if(pause) {
      noLoop();
    } else {
      loop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function bucketContainsFruit(bucket, fruit) {
  let bucketLeft = bucket.x - bucket.width / 2;
  let bucketRight = bucket.x + bucket.width / 2;
  let bucketTop = bucket.y - bucket.height / 2;
  return fruit.x > bucketLeft && fruit.x < bucketRight && fruit.y > bucketTop;
}