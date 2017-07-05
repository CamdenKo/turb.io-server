

function Player(id,position,color,bpm,trails){
  this.id = id||0
  this.position = position||{x:0,y:0}
  this.color = color||1
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

Player.prototype.toObj = function(){
  return {playerId: this.id, position: this.position, color: this.color, bpm : this.bpm, trails: this.trails}
}

Player.prototype.toArr = function(){
  let out = [this.id,this.position.x,this.position.y,this.color,this.bpm]
  this.trails.forEach(obj => {
    out.push(obj.x)
    out.push(obj.y)
  })
  out.push(0)
  return out
}

Player.prototype.toTypedArr = function(){
  return new Uint8Array(this.toArr())
}
module.exports = Player
