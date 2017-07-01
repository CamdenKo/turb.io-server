import io from 'socket.io-client'
let socket = io(window.location.origin)
import gameEmitter from './gameEmitter.js'

socket.on('connect', function(){
  console.log('connected')
})

gameEmitter.on('click',function(){
  socket.emit('click')
})
