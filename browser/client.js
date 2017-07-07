import io from 'socket.io-client'
import gameEmitter from './gameEmitter.js'
let socket = io(window.location.origin)
// import {game, Game} from './game.js'
import PlayerC from './helperFuncs/player.js'

let Client = {}
Client.socket = socket
Client.id = 0
Client.me = new PlayerC()
Client.players = {} //id: PlayerC

// console.log(game.isBooted)

// console.log('game',game)
// console.log('game.load',game.load)
Client.sendUpdate = function(){
  socket.send(new Uint8ClampedArray([1]))
}

gameEmitter.on('click',function(){
  socket.send(new Uint8Array([1,2,3]))
})

gameEmitter.on('ready', function(){

  socket.emit('ready')
})

Client.connect = function(Game){
  console.log('client.connect')

  socket.on('message', (message) =>{
    console.log(message)
  })

  // socket.on('init', (initObj) => {
  //   console.log('socket init', initObj)
  //   // Game.addNewPlayer(new PlayerC())
  //   let arr = Object.keys(initObj).map(key => initObj[key])
  //   convertArrToPlayers(arr)
  // })
}

 function convertArrToPlayers (arr){
   if(!arr.length){
     return
   }
   console.log(arr)
  let index = 0
  let lastIndex = 0
  let temp = arr[index]

  while(temp!== 0){
    temp = arr[++index]
  }
  Client.me = new PlayerC()
  Client.me.fromArr(arr.slice(0,index))
  Client.id = Client.me.id
  lastIndex = index

  while(index < arr.length){
    while(temp !== 0){
      temp = arr[++index]
    }
    let newPlayer = new PlayerC()
    newPlayer.fromArr(arr.slice(lastIndex + 1, index))
    if(!newPlayer.id){break}
    Client.players[newPlayer.id] = newPlayer
    lastIndex = index++
    temp = arr[index]
  }
  console.log('finished while loop')
  // game.add.sprite(100,100,'player')
  // Game.addNewPlayer(Client.me)
  // for(let key in Client.players){
  //   if(key){
  //     Game.addNewPlayer(Client.players[key])
  //   }
  // }
  console.log('client.me', Client.me)
  console.log('all other players', Client.players)
}
export default Client
