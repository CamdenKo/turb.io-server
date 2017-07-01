import EventEmitter from './event-emitter.js'
let gameEmitter = new EventEmitter()

let canvas = document.getElementById('gameCanvas')
let ctx = canvas.getContext('2d')

canvas.addEventListener('mousedown', function(e){
  gameEmitter.click()
})

gameEmitter.click = function(){
  gameEmitter.emit('click')
}

gameEmitter.sendUpdate = function(){
  gameEmitter.emi
}
export default gameEmitter
