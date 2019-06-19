var imgPath = 'assets/imgs/';
var bgImage;
var bottleImages = {};
var fruitImages = {};

function preload()
{
    loadBottles();
    loadFruits();
}

function setup()
{
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas');

    var mgr = new SceneManager();
    mgr.wire();
    mgr.showScene( Intro );
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function removeWiteSpaces(img) {
    img.loadPixels();

    for(let x = 0; x < img.width; x++){
        for(let y = 0; y < img.height; y++) {
            let index = (x + y * img.width) * 4;
            
            if (img.pixels[index] > 240 && img.pixels[index + 1] > 240 && img.pixels[index + 2] > 240) {
                img.pixels[index + 3] = 0;
            }
        }
    }

    img.updatePixels();
}

function loadBottles() {
    bottleImages.cherryBottle = loadImage(imgPath + 'cherry.png');
    bottleImages.mintBottle = loadImage(imgPath + 'feijoa.png');
    bottleImages.peachBottle = loadImage(imgPath + 'peach.png');
    bottleImages.raspberryBottle = loadImage(imgPath + 'raspberry.png');
    bottleImages.mintBottle = loadImage(imgPath + 'mint.png');
    bottleImages.feijoaBottle = loadImage(imgPath + 'feijoa.png');
}

function loadFruits() {
    fruitImages.raspberry = loadImage(imgPath + 'original-raspberry.png');
}
