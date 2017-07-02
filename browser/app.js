import io from 'socket.io-client'
let socket = io(window.location.origin)
import gameEmitter from './gameEmitter.js'

socket.on('connect', function(){
  console.log('connected')
})

//message from server
socket.on('message', (message) =>{
  console.log(message)
})

gameEmitter.on('click',function(){
  socket.send(new Uint8ClampedArray([1,2,3]))
})
