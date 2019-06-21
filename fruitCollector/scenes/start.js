function preload()
{
    loadLeaves();
    loadBottles();
    loadFruits();
    loadLife();
    loadFonts();
    sequenceImage = loadImage(imgPath + 'cat.png');
    xushturi = loadImage(imgPath + 'xushturi.png');
}

function setup()
{
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas');
    leaves = new Leaves(leavesImages.mint);

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
    fruitImages.leaves = [loadImage(imgPath + 'leaves/mint/mintleft.png'), loadImage(imgPath + 'leaves/mint/mintright.png')];
}

function loadLeaves() {
    leavesImages.mint = loadImage(imgPath + 'leaves/mint/mint-leaves.png');
}

function loadLife() {
    lifeImages.active = loadImage(imgPath + 'heart.png')
    lifeImages.inactive = loadImage(imgPath + 'deadheart.png')
}

function loadFonts() {
    fonts.LGVBold = loadFont(fontsPath + 'lgv-bebas-neue-bold-bold.otf');
    fonts.LVGRegular = loadFont(fontsPath + 'LVG-BEBAS-NEUE-REGULAR.otf');
}