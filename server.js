var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

var socketio = require('socket.io');

server.on('request', app);

var io = socketio(server);

const gameLoop = require('./serverside/gameLoop')()

let messageQ = []
server.listen(1337, function () {
  console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function (socket) {
  console.log(socket.id, 'connected');
  socket.on('click',function(){
    console.log('click!')
  })
  //mesage from server
  socket.on('message', function(message){
    console.log(message)
    messageQ.push(message)
    socket.broadcast.send(messageQ)
  })
})
