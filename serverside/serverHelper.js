let serverHelper = {}
const PlayerC = require('./player.js')

serverHelper.randomInt = function(low,high){
  return Math.floor(Math.random() * (high - low) + low)
}

serverHelper.randomPlayer = function(playerId){
  return new PlayerC(playerId,{x:this.randomInt(100,400),y:this.randomInt(100,400)},this.randomInt(1,250))
}

module.exports = serverHelper
