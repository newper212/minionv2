const ws = require('websocket');
const http = require('http');
const downloadProcess = require('./downloadProcess');

const server = http.createServer(function (req, res) {
  res.end('it works');
});
server.listen(8080);

const wss = new ws.server({
  httpServer: server,
});

wss.on('request', function (socket) {
  blas();
});

function blas() {
  downloadProcess({
    input: ['/Users/ismael/repos/bot/src/excel/aldo.xlsx'][0],
    onStart: function () {},
    onProgress: function () {},
    onEnd: function () {},
  });
}


/*



const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const config = require('./config');
const PORT = config.get('http_port');

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.get('/', function (req, res) {
  res.end('from server!');
});

// const renameProcess = require('./renameProcess');
const downloadProcess = require('./downloadProcess');

io.on('connection', function (socket) {
  socket.on('renameRun', function (data) {

    // downloadProcess({
    //   input: data.input[0],
    //   output: data.output[0],
    //   onStart: function () {
    //     socket.emit('renameStart');
    //   },
    //   onProgress: function (value) {
    //     socket.emit('renameProgress', value);
    //   },
    //   onEnd: function () {
    //     socket.emit('renameEnd');
    //   },
    // });


  });
});

server.listen(PORT, function () {
  console.log('server listening on port ' + PORT);
});

// module.exports = server;
*/
