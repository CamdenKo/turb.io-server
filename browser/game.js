//message from server

// import Client from './client.js'
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
}

Game.create = function(){
  Game.playerMap = {}
  let map = game.add.tilemap('map')
  map.addTilesetImage('tilesheet', 'tileset')
  let layer
  for(let layerNum = 0; layerNum < map.layers.length; layerNum++){
    layer = map.createLayer(layerNum)
  }
  layer.inputEnabled = true
}

Game.removePlayer = function(playerId){
  this.playerMap[playerId].destroy()
  delete this.playerMap[playerId]
}

Game.addNewPlayer = function(player){
  Game.playerMap[player.id] = game.add.sprite(player.position.x,player.position.y,'player')
}

let game = new Phaser.Game(24*32,17*32, Phaser.AUTO, document.getElementById('game'))
game.state.add('Game',Game)
game.state.start('Game')


export {game, Game}

