var path = require('path');
process.setMaxListeners(0)
var http = require('http');
var server = http.createServer();
var express = require('express');
var app = express();
var socketio = require('socket.io');

server.on('request', app);

var io = socketio(server);

let gameLoopC = require('./gameLoop.js')
let gameLoop = new gameLoopC()

const startDelay = 1000
const serverRefresh = 100
const serverHelper = require('./serverside/serverHelper.js')
const playerC = require('./serverside/player.js')

let messageQ = []
let newPlayerId = 1

server.listen(1337, function () {
  console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function (socket) {
  console.log(socket.id, 'connected');
  //initialize new player

  socket.on('ready', function(){
    socket.player = serverHelper.randomPlayer(newPlayerId++)
    gameLoop.addPlayer(socket.player)
    console.log('player', socket.player)
    socket.emit('init',gameLoop.playerInitData(socket.player.id))
  })

  socket.on('click',function(){
    console.log('click!')
  })
  //message from client
  socket.on('message', function(message){
    console.log(message)
    messageQ.push(message)
    socket.broadcast.send(messageQ)
  })
})

setTimeout(function(){
  setInterval(function(){
    // console.log('interval')
    if(messageQ.length){
      let tempMessages = messageQ
      messageQ = []
      gameLoop.readableIn = (tempMessages)
      gameLoop.iteration()
    }
  },serverRefresh)}, startDelay
)
