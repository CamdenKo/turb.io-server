function PlayerWebSocketOptimizer() {

}

//obj{id,pos:{},color, bpm, trails: [{x,y},{x,y}]}
//out[id,pos,color,bpm,trail positions]
PlayerWebSocketOptimizer.prototype.encrypt = function(obj){
  let out = [obj.id,obj.pos.x,obj.pos.y,obj.color,obj.bpm]
  obj.trails.forEach(function(element) {
    out.push(element.x)
    out.push(element.y)
  }, this);
  return new Uint8ClampedArray(out)
}

//arr
//out [{playerId: 0-255, color: 0 -255, bpm: 0 -255 trails:[{x,y},{x,y}]},{}...]
PlayerWebSocketOptimizer.prototype.decrypt = function(arr){
  let out = []
  let inIndex =0
  let outIndex=0
  while(inIndex < arr.length){
    out.push({})
    out[outIndex].playerId = arr[inIndex++]
    out[outIndex].color = arr[inIndex++]
    out[outIndex].bpm = arr[inIndex++]
    out[outIndex].trails = []
    let temp = arr[inIndex]
    let trailIndex = 0
    while(temp && temp !== 0 )
    {
      out[outIndex].trails.push({x:arr[inIndex], y: arr[inIndex + 1]})
      inIndex += 2
      temp = arr[inIndex]
    }
    inIndex++
    outIndex++
  }
  return out
}

module.exports = PlayerWebSocketOptimizer
