function Player(id,position,color,bpm,trails){
  this.id = id||0
  this.position = position||{x:0,y:0}
  this.color = color||0
  this.bpm = bpm||150
  this.trails = trails||[]
}

//in: [{x,y}, {x,y}]
Player.prototype.addTrails = function(trailAdd){
  trailAdd.forEach(ele => this.trails.push(ele))
}

Player.prototype.completelyChangeTrails = function(trailArr){
  this.trails = []
  this.addTrails(trailArr)
}

module.exports = Player
