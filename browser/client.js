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
  socket.send(new Uint8Array([1,2,3]))
})

socket.on('connect', function(){
  console.log('connected')
  socket.emit('newplayer')
})

socket.on('message', (message) =>{
  console.log(message)
})

socket.on('init', (initObj) => {
  console.log(initObj.constructor === Uint8ClampedArray)
  console.log(initObj)
  let arr = Object.keys(initObj).map(key => initObj[key])
  // console.log(initObj[0])
  // console.log(new Uint8Array(initObj[0]))
  console.log(arr)


})
