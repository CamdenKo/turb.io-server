const chai = require('chai')
const expect = chai.expect
const gameLoopC = require('../gameLoop.js')
const gameLoop = new gameLoopC()

describe('gameLoop', () => {
  describe('process inputs', () => {
    it('should work', () => {
      gameLoop.proccessInputs([[1,2,3,4,5,6,7,8,9],[10,11,12,13,14,15,16,17,18]])
      console.log(gameLoop)
    })
  })
})
