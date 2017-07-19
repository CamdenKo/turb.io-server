//message from server

import gameEmitter from './gameEmitter'
console.log(gameEmitter)
import Pool from './pool'

// import Client from './client.js'
let Game = {}
let key = {}
let Sprites = {}
let soundpool

Game.playerMap = []
Game.myId = -1
Game.canMove = true

let gameProps = {
  width: 24*32,
  height: 17 * 32,
  numGrids: 24,
  moveSpeed: 300,
  initBpm: 110,
  bpm: 110
}

Game.init = function(){
  game.stage.disableVisibilityChange= true
}
Game.preload = function() {
  game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON)
  game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32)
  Sprites.player = game.load.image('player', 'assets/sprites/sprite.png')
  game.load.audio('music', 'assets/music/all.mp3')
  soundpool = new Pool(game, Sprites.player,20, 'sounds')

  game.load.start()
}

Game.create = function(){
  gameProps.music = game.add.audio('music')
  gameProps.music.loop = true
  gameProps.music.play()
  Game.playerMap = {}
  let map = game.add.tilemap('map')
  map.addTilesetImage('tilesheet', 'tileset')
  let layer
  for(let layerNum = 0; layerNum < map.layers.length; layerNum++){
    layer = map.createLayer(layerNum)
  }
  layer.inputEnabled = true

  key = {
    up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
    down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
    left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
    right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  }

  soundpool.create(100,100,{velocity: {x: 100, y: 0}})
}

Game.movePlayer = function(id,x,y){
  this.canMove = false
  let player = Game.playerMap[id]
  let duration = gameProps.moveSpeed
  let tween = game.add.tween(player)
  tween.to({x:x,y:y}, duration)
  tween.start()
  tween.onComplete.add(function(){Game.canMoveAgain()})
}

Game.moveOtherPlayer = function(id,x,y){
  let player = Game.playerMap[id]
  let tween = game.add.tween(player)
  tween.to({x:x,y:y}, 30)
  tween.start()

}

Game.update = function(){
  if(this.myId !== -1)
  {
    // console.log(Game.playerMap[this.myId].velocity.x)
    // this.playerMap[this.myId].body.moves = false
    let x = this.playerMap[this.myId].x
    let y = this.playerMap[this.myId].y
    let distance = gameProps.width/ gameProps.numGrids
    if(this.canMove){
      if(key.up.isDown){
        this.movePlayer(this.myId,x,y - distance)
      } else if (key.down.isDown) {
        this.movePlayer(this.myId,x,y + distance)
      } else if (key.left.isDown) {
        this.movePlayer(this.myId,x - distance,y)
      } else if(key.right.isDown) {
        this.movePlayer(this.myId,x + distance,y)
      }
    } else {
      gameEmitter.message(new Uint16Array([this.myId,x,y,1,gameProps.bpm,[]]))
    }
  }
}

Game.canMoveAgain = function(){
  this.canMove = true
}
Game.removePlayer = function(playerId){
  this.playerMap[playerId].destroy()
  delete this.playerMap[playerId]
}

Game.addNewPlayer = function(player){
  Game.playerMap[player.id] = game.add.sprite(player.position.x,player.position.y,'player')
}

let game = new Phaser.Game(gameProps.width,gameProps.height, Phaser.AUTO, document.getElementById('game'))
game.state.add('Game',Game)
game.state.start('Game')


export {game, Game}

