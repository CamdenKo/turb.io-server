const optimizerC = require('./serverside/websocketOptimizer.js')
const optimizer = new optimizerC()
const playerConstructor = require('./serverside/player.js')

function GameLoop() {
  this.readableIn =[]
  this.players = {} //{id: Player}
  this.trails = []
}

GameLoop.prototype.removePlayer = function(id){
  this.players[id] = null
}

GameLoop.prototype.iteration = function(){
  if(this.readableIn.length){
    console.log('good iteratoin!', this.readableIn)
  } else {
    throw new Error('Game loop cannot iterate without proccessInputs')
  }
}

GameLoop.prototype.proccessInputs = function(inArr){
  this.readableIn = inArr.map((ele) => optimizer.decrypt(ele))
  this.trails = []
  this.readableIn.forEach(ele => {
    //if player exist
    if(this.players[ele.id]){
      this.players[ele.id].position = ele.position
      this.players[ele.id].bpm = ele.bpm
      this.players[ele.id].trails = ele.trails
    } else {
      this.players[ele.id] = new playerConstructor(ele.id,ele.pos,ele.color,ele.bpm,ele.trails)
    }
    ele.trails.forEach(trail => {
      if(trail) this.trails.push(trail)
    })
  })
}

module.exports = GameLoop
