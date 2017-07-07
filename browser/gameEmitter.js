import EventEmitter from './event-emitter.js'
let gameEmitter = new EventEmitter()

let canvas = document.getElementById('gameCanvas')
let ctx = canvas.getContext('2d')

canvas.addEventListener('mousedown', function(e){
  gameEmitter.click()
})

gameEmitter.click = function(){
  console.log('everthing has been loaded')
  gameEmitter.emit('click')
}

<<<<<<< HEAD
gameEmitter.sendUpdate = function(){
  // gameEmitter.emi
=======
gameEmitter.ready = function(){
  gameEmitter.emit('ready')
>>>>>>> playerCreate
}
export default gameEmitter
