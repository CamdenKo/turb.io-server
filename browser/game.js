//message from server

import Client from './client.js'
let Game = {}

Game.playerMap = []



Game.init = function(){
  game.stage.disableVisibilityChange= true
}
Game.preload = function() {
  game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON)
  game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32)
  game.load.image('player', 'assets/sprites/sprite.png')
  game.load.start()
  console.log('finished preload')
}

Game.create = function(){
  console.log('game create')
  Game.playerMap = {}
  let map = game.add.tilemap('map')
  map.addTilesetImage('tilesheet', 'tileset')
  let layer
  for(let layerNum = 0; layerNum < map.layers.length; layerNum++){
    layer = map.createLayer(layerNum)
  }
  layer.inputEnabled = true
  Client.connect(this)
  // this.addNewPlayer({id: 1,position:{x:200,y:200}})
  //send new player ping
  Client.socket.on('init', inData => console.log(inData))
}



Game.addNewPlayer = function(player){
  console.log('player',player)
  console.log(player.id, player.position.x,player.position.y)
  Game.playerMap[player.id] = game.add.sprite(player.position.x,player.position.y,'player')
}

let game = new Phaser.Game(24*32,17*32, Phaser.AUTO, document.getElementById('game'))
game.state.add('Game',Game)
game.state.start('Game')


// export {game, Game}

