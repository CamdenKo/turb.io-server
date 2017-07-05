const chai = require('chai')
const expect = chai.expect
const optimizer = require('../serverside/websocketOptimizer.js')
const pOptimizer = require('../browser/helperFuncs/playerwebsocketOptimizer.js')
chai.should()

// import optimizer from '../browser/helperFuncs/websocketOptimizer.js'

let optimizerObj = new optimizer()
let playerOptimizerObj = new pOptimizer()
describe('optimizer', () =>{
  beforeEach(() => {
    optimizerObj = new optimizer()
  })
  describe('findSizeof8ArrayFromObj', () =>{
    it('should work for empty obj', () => {
      expect(optimizerObj.findSizeOf8ArrayFromObj({})).to.eql(0)
    })
    it('should work for a simple object' , () => {
      expect(optimizerObj.findSizeOf8ArrayFromObj({a:1,b:2,c:3})).to.eql(3)
    })
    it('should work for nested objects', () => {
      expect(optimizerObj.findSizeOf8ArrayFromObj({a:{b:1,c:2},d:3})).to.eql(3)
    })
    it('should work for objects with nested arrays', () => {
      expect(optimizerObj.findSizeOf8ArrayFromObj({a:[1,2,3,4],b:5,c:{d:6,e:7}})).to.eql(7)
    })
    it('should work for arrays of objects', () => {
      expect(optimizerObj.findSizeOf8ArrayFromObj([{a:1,b:2},3,{c:4}])).to.eql(4)
    })
  })

  describe('encrypt', () => {
    it('should work for an empty array' ,() => {
      expect(optimizerObj.encrypt([])).to.eql(new Uint8ClampedArray(0))
    })
    it('should work for a single player', () => {
      expect(optimizerObj.encrypt([{playerId: 1, position: {x:2,y:3}, color: 4, bpm: 5, trails:[{x:6,y:7}]}])).to.eql(new Uint8ClampedArray([1,2,3,4,5,6,7,0]))
    })
    // it('should work for a single player object', () => {
    //   expect(optimizerObj.encrypt([{playerId: 1, color: 1, bpm: 1, trails:[{x:1,y:1}]}])).to.eql(new Uint8ClampedArray([1,1,1,1,1,0]))
    // })
    // it('should work for multiple player objects', () => {
    //   expect(optimizerObj.encrypt([{playerId: 1, color: 1, bpm: 1, trails:[{x:1,y:1}]},{playerId: 1, color: 1, bpm: 1, trails:[{x:1,y:1}]}])).to.eql(new Uint8ClampedArray([1,1,1,1,1,0,1,1,1,1,1,0]))
    // })
  })

  describe('decrypt', () => {
    it('should work for a player with no trails', () => {
      expect(optimizerObj.decrypt([1,2,3,4,5])).to.eql({id:1,pos:{x:2,y:3},color: 4, bpm: 5, trails:[]})
    })
    it('should work for a player with many trails', () => {
      expect(optimizerObj.decrypt([1,2,3,4,5,6,7,8,9])).to.eql({id:1,pos:{x:2,y:3},color: 4, bpm: 5, trails:[{x:6,y:7}, {x:8,y:9}]})
    })
  })
})

describe('Player Optimizer', () => {
  beforeEach(() => {
    playerOptimizerObj = new pOptimizer()
  })
  describe('encrypt', () => {
    it('works for no trails', () => {
      expect(playerOptimizerObj.encrypt({id:1, pos:{x:2,y:3}, color: 4, bpm: 5, trails:[]})).to.eql(new Uint8ClampedArray([1,2,3,4,5]))
    })
    it('works for several trails', () => {
      expect(playerOptimizerObj.encrypt({id:1, pos:{x:2,y:3}, color: 4, bpm: 5, trails:[{x:6,y:7}, {x:8,y:9}]})).to.eql(new Uint8ClampedArray([1,2,3,4,5,6,7,8,9]))
    })
  })
  describe('decrypt', () => {
    it('works for an array with one player and no trail', () => {
      expect(playerOptimizerObj.decrypt(new Uint8ClampedArray([1,2,3,0]))).to.eql([{playerId:1, color:2,bpm:3, trails:[]}])
    })
    it('works for one player and trails', () => {
      expect(playerOptimizerObj.decrypt(new Uint8ClampedArray([1,2,3,4,5,0]))).to.eql([{playerId:1, color:2,bpm:3, trails:[{x:4,y:5}]}])
    })
    it('works for multiple players with no trails', () => {
      expect(playerOptimizerObj.decrypt(new Uint8ClampedArray([1,2,3,0,4,5,6,0]))).to.eql([{playerId:1, color:2,bpm:3,trails:[]},{playerId:4,color:5,bpm:6,trails:[]}])
    })
    it('works for multiple players with multiple trails', () => {
      expect(playerOptimizerObj.decrypt(new Uint8ClampedArray([1,2,3,7,8,9,10,0,4,5,6,11,12,0]))).to.eql([{playerId:1, color:2,bpm:3,trails:[{x:7,y:8},{x:9,y:10}]},{playerId:4,color:5,bpm:6,trails:[{x:11,y:12}]}])
    })
  })
})

describe('player and server optimizers', () => {
  describe('player encrypt server decrypt', () => {
    it('should work together for a player with no trails', () => {
      let playerInfo = {id:1, pos:{x:2,y:3}, color: 4, bpm: 5, trails:[]}
      expect(optimizerObj.decrypt(playerOptimizerObj.encrypt(playerInfo))).to.eql(playerInfo)
    })
    it('shoud work together for a player with several trails', () => {
      let playerInfo = {id:1, pos:{x:2,y:3}, color: 4, bpm: 5, trails:[{x:6,y:7}, {x: 8,y: 9}]}
      expect(optimizerObj.decrypt(playerOptimizerObj.encrypt(playerInfo))).to.eql(playerInfo)
    })
  })
})
