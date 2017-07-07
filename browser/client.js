import io from 'socket.io-client'
import gameEmitter from './gameEmitter.js'
let socket = io(window.location.origin)
import {game, Game} from './game.js'
import PlayerC from './helperFuncs/player.js'

let Client = {}
Client.socket = socket
Client.id = 0
Client.me = new PlayerC()
Client.players = {}

// console.log(game.isBooted)

// console.log('game',game)
// console.log('game.load',game.load)

waitForGame()

function waitForGame(){
  if(!game.isBooted || !game.load.hasLoaded){
    window.setTimeout(waitForGame, 100)
  } else{
    Client.connect()
  }
}

Client.sendUpdate = function(){
  socket.send(new Uint8ClampedArray([1]))
}

gameEmitter.on('click',function(){
  // socket.send(new Uint8Array([1,2,3]))
})

gameEmitter.on('ready', function(){
  socket.emit('ready')
})

gameEmitter.on('message', function(contents){
  socket.send(contents)
})

Client.addPlayer = function(player){
  this.players[player.id] = player
  Game.addNewPlayer(player)
}

Client.connect = function(){

  socket.emit('ready')

  socket.on('message', (message) =>{
    console.log(message)
  })

  socket.on('init', (initObj) => {
    let arr = Object.keys(initObj).map(key => initObj[key])
    convertArrToPlayers(arr)
    Game.myId = Client.me.id
  })

  socket.on('newP', (initObj) => {
    let newPlayer = new PlayerC()
    let playerArr = Object.keys(initObj).map(key => initObj[key])
    newPlayer.fromArr(playerArr)
    Game.addNewPlayer(newPlayer)
  })

  socket.on('removeP', (id) => {
    Game.removePlayer(id[0])
    delete Client.players[id[0]]
  })
}

 function convertArrToPlayers (arr){
   if(!arr.length){
     return
   }
  let index = 0
  let lastIndex = 0
  let temp = arr[index]

  while(temp!== 0){
    temp = arr[++index]
  }
  Client.me = new PlayerC()
  Client.me.fromArr(arr.slice(0,index))
  Client.id = Client.me.id
  lastIndex = index++
  temp = arr[index]

  while(index < arr.length){
    while(temp !== 0){
      temp = arr[++index]
    }
    let newPlayer = new PlayerC()
    newPlayer.fromArr(arr.slice(lastIndex + 1, index))
    Client.players[newPlayer.id] = newPlayer
    lastIndex = index++
    temp = arr[index]
  }
  Game.addNewPlayer(Client.me)
  for(let key in Client.players){
    if(key){
      Game.addNewPlayer(Client.players[key])
    }
  }

}
// export default Client
