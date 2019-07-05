const LEVEL = [
  {
    leaves: 'mint',
    introFruit: {
      name: 'mint',
      width: 355,
      height: 159
    },
    fruits: [
      {
        fruit: 'leaves',
        width: 70,
        height: 120
      }
    ],
    fruitSpeedRange: {
      start: 5,
      end: 2
    },
    correctFruits: ['leaves'],
    fruitName: 'pitna',
    bottle: 'mintBottle',
    color: colors.sefoamBlue,
    maxFruitsToGather: 25,
    fruitGenerateSpeed: 600
  },
  {
    leaves: 'feijoa',
    introFruit: {
      name: 'feijoa',
      width: 300,
      height: 165
    },
    fruits: [
      {
        fruit: 'feijoa',
        width: 80,
        height: 115
      },
      {
        fruit: 'leaves',
        width: 70,
        height: 120
      }
    ],
    fruitSpeedRange: {
      start: 6,
      end: 2
    },
    correctFruits: ['feijoa'],
    fruitName: 'feixoia',
    bottle: 'feijoaBottle',
    color: colors.lightMossGreen,
    maxFruitsToGather: 25,
    fruitGenerateSpeed: 500
  },
  {
    leaves: 'cherry',
    introFruit: {
      name: 'cherry',
      width: 290,
      height: 145
    },
    fruits: [
      {
        fruit: 'cherry',
        width: 45,
        height: 110
      },
      {
        fruit: 'feijoa',
        width: 80,
        height: 115
      },
    ],
    fruitSpeedRange: {
      start: 6,
      end: 2
    },
    correctFruits: ['cherry'],
    fruitName: 'alubali',
    bottle: 'cherryBottle',
    color: colors.lipstick,
    maxFruitsToGather: 25,
    fruitGenerateSpeed: 450
  },
  {
    leaves: 'peach',
    introFruit: {
      name: 'peach',
      width: 310,
      height: 150
    },
    fruits: [
      {
        fruit: 'peach',
        width: 85,
        height: 85
      },
      {
        fruit: 'cherry',
        width: 45,
        height: 110
      }
    ],
    fruitSpeedRange: {
      start: 7,
      end: 3
    },
    correctFruits: ['peach'],
    fruitName: 'atami',
    bottle: 'peachBottle',
    color: colors.paleOrange,
    maxFruitsToGather: 25,
    fruitGenerateSpeed: 450
  },
  {
    leaves: 'raspberry',
    introFruit: {
      name: 'raspberry',
      width: 340,
      height: 200
    },
    fruits: [
      {
        fruit: 'raspberry',
        width: 90,
        height: 90
      },
      {
        fruit: 'vanilla',
        width: 90,
        height: 80
      },
      {
        fruit: 'peach',
        width: 85,
        height: 85
      },
      {
        fruit: 'cherry',
        width: 45,
        height: 110
      }
    ],
    fruitSpeedRange: {
      start: 6,
      end: 2
    },
    correctFruits: ['raspberry', 'vanilla'],
    fruitName: 'jolo',
    bottle: 'raspberryBottle',
    color: colors.darkPink,
    maxFruitsToGather: 25,
    fruitGenerateSpeed: 350
  }
];