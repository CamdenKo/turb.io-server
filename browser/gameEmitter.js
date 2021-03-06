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

gameEmitter.ready = function(){
  gameEmitter.emit('ready')
}

gameEmitter.message = function(contents){
  gameEmitter.emit('message', contents)
}
export default gameEmitter
