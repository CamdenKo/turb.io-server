import io from 'socket.io-client'
import gameEmitter from './gameEmitter.js'
let socket = io(window.location.origin)
import {game, Game} from './game.js'

let Client = {}
Client.socket = socket
Client.id = 0

Client.sendUpdate = function(){
  socket.send(new Uint8ClampedArray([1]))
}

gameEmitter.on('click',function(){
  socket.send(new Uint8ClampedArray([1,2,3]))
})

socket.on('connect', function(){
  console.log('connected')
  socket.emit('newplayer')
})

socket.on('message', (message) =>{
  console.log(message)
})

socket.on('init', (initArr) => {
  console.log(initArr)
})
