//message from server

let Game = {}
Game.init = function(){
  game.stage.disableVisibilityChange= true
}
Game.preload = function() {
  game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON)
  game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32)
  game.load.image('sprite', 'assets/sprites/sprite.png')
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
  //send new player ping
}

let game = new Phaser.Game(24*32,17*32, Phaser.AUTO, document.getElementById('game'))
game.state.add('Game',Game)
game.state.start('Game')

export {game, Game}

