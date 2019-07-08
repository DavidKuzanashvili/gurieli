function Intro() {
    var title;
    var bottles = [];
    var btn;
    var topBox;
    var fruits = [];

    // this.enter = function() {
    //     sounds.background.stop();
    // }

    this.setup = function () {
        title = new Title(width / 2, 100, '#TamaSi');
        // var bottlesCount = Object.keys(bottleImages).length;
        // var bottlesOffsetLeft = (width - (bottlesCount * 150 + (bottlesCount - 1) * 60)) / 2 + 75;

        // for (var key in bottleImages) {
        //     bottles.push(new Bottle(bottlesOffsetLeft, bottleImages[key], 0));
        //     bottlesOffsetLeft += 150 + 60;
        // }

        var fruitImagesList = Object.values(fruitImages);

        for (var i = 0; i < 50; i++) {
            var fruit = random(random(fruitImagesList));
            fruit.x = parseInt(randomGaussian(width / 2, width / 7));
            fruit.y = parseInt(randomGaussian(height / 2, height / 7));
            // fruit.x = parseInt(random(width));
            // fruit.y = parseInt(random(height));
            fruits.push(fruit);
        }

        btn = new Button({
            x: width / 2,
            y: height / 2,
            backgroundColor: color('#86b23d'),
            font: fonts.LGVBold,
            content: 'daiwye',
            onUpdate: function () {
                this.x = width / 2;
                this.y = height / 2;
            }
        });

        topBox = new Top({
            x: round(width / 2),
            y: round(height / 2),
            width: 927,
            height: 720,
            color: '#86b23d',
        });

        // topBox.setData([
        //     {
        //         title: "ნინექს13",
        //         score: 23984,
        //     },
        //     {
        //         title: "ნიქნეიმ",
        //         score: 23984,
        //     },
        //     {
        //         title: "დიდი სახელი და გვარი მამის სახელი",
        //         score: 23984,
        //     },
        //     {
        //         title: "ნინო",
        //         score: 23984,
        //     },
        //     {
        //         title: "ნინექს13",
        //         score: 23984,
        //     },
        //     {
        //         title: "ნიქნეიმ",
        //         score: 23984,
        //     },
        //     {
        //         title: "დიდი სახელი და გვარი მამის სახელი",
        //         score: 23984,
        //     },
        //     {
        //         title: "ნინო",
        //         score: 23984,
        //     },
        //     {
        //         title: "დიდი სახელი და გვარი მამის სახელი",
        //         score: 23984,
        //     },
        //     {
        //         title: "ნინო",
        //         score: 23984,
        //     },
        // ]);

        // topBox.install(this);
    }

    this.draw = function () {
        background('#003919')

        cursor('default');
        drawIntroScreen();
    }

    this.mousePressed = function () {
        if (btn.contains(mouseX, mouseY)) {
            btn.animate('down');
            btn.events.down.end = function () {
                this.sceneManager.showScene(RoundStart);
            }.bind(this);
        }
    }

    function drawIntroScreen() {
        // title.draw();

        fruits.forEach(function (f) {
            image(f.img, f.x, f.y, f.w, f.h, 0, 0, f.img.width, f.img.height);
        });

        btn.update();
        btn.draw();

        // topBox.update();
        // topBox.draw();
    }
}
