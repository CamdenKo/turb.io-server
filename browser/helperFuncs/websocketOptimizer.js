function websocketOptimizer(){
}

//obj [{playerId: 0-255, color: 0 -255, bpm: 0 -255 trails:[{x,y},{x,y}]},{}...] the x and y values should be relative to game canvas
//out[,,,,,0]
websocketOptimizer.prototype.encrypt = function(arr){
  let outRegArr = []
  arr.forEach((obj) => {
    for(let key in obj){
      if(typeof obj[key] === 'object'){
        //in trails array
        obj[key].forEach((pair) => {
          outRegArr.push(pair.x)
          outRegArr.push(pair.y)
        })
        outRegArr.push(0)
      } else {
        outRegArr.push(obj[key])
      }
    }
  })
  return new Uint8ClampedArray(outRegArr)
}

//arr[id,pos,color,bpm,trail positions]
//out{id,pos:{},color, bpm, trails: [{x,y},{x,y}]}
websocketOptimizer.prototype.decrypt = function(arr){
  let out = {}
  let index = 0
  let continueReading = true
  out.id = arr[index++]
  out.pos = {}
  out.pos.x = arr[index++]
  out.pos.y = arr[index++]
  out.color = arr[index++]
  out.bpm = arr[index++]
  out.trails = []
  let numTrails = 0
  while(index < arr.length){
    out.trails.push({})
    out.trails[numTrails].x = arr[index++]
    out.trails[numTrails].y = arr[index++]
    numTrails++
  }
  return out
}
websocketOptimizer.prototype.findSizeOf8ArrayFromObj = function(obj){
  let count = 0
  for(var key in obj){
    if(obj.hasOwnProperty(key)){
      if(typeof obj[key] === 'object')
      {
        count += this.findSizeOf8ArrayFromObj(obj[key])
      } else {
        count ++;
      }
    }
  }
  return count
}


// export default websocketOptimizer
module.exports = websocketOptimizer
