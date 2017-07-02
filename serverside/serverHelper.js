let serverHelper = {}
serverHelper.randomInt = function(low,high){
  return Math.floor(Math.random() * (high - low) + low)
}
module.exports = serverHelper
