function websocketOptimizer(fromServer){
  this.fromServer = fromServer //BOOLEAN
}

//obj [{playerId: 0-255, color: 0 -255, trails:[{x,y},{x,y}]},{}...] the x and y values should be relative to game canvas
websocketOptimizer.prototype.encrypt = function(obj){
  let stopCode = 0
  // 0-255 are allowed insigned unsigned 8 bit array
  if(fromServer){
    //player positions
    //trail positions
    //[playerID, color, xpos, ypos, xtrail, ytrail]

  } else {

  }
}

websocketOptimizer.prototype.decrypt = function(obj){
  if(fromServer){

  } else {

  }
}

websocketOptimizer.prototype.encodeUint8 = function(number){
  let arr = new Uint8Array(1)
  arr[0] = number
  return String.fromCharCode(arr[0])
}

export default websocketOptimizer
