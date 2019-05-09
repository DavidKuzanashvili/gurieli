function drawPlayingScene() {
  if(millis() > fruitAddLastTime + 1000) {
    fruitAddLastTime = millis();
    let {models, speed} = LEVELS[CURRENT_LEVEL].fruit;
    fruits.push(new Fruit(random(width), -50, models[Math.floor(Math.random()*models.length)], speed));
  }

  drawScore.draw();
  bucket.update();
  for(let i = 0; i < fruits.length; i++) {
    fruits[i].update();

    // out of border fruit
    if(fruits[i].y > height) {
      fruits.splice(i, 1);
      i--;
      continue;
    }

    // bucket contains fruit
    if(bucketContainsFruit(bucket, fruits[i])) {
      bucket.addFruit(...fruits.splice(i, 1));
      score++;
      drawScore.score = score;
      i--;
      continue;
    }
  }

  fruits.forEach((fruit) => {
    fruit.draw();
  });
  bucket.draw(); 

  if(bucket.fruits.length >= LEVELS[CURRENT_LEVEL].capacity) {
    gameState = 'won';
  }
}