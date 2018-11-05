const express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const fileUpload = require('../lib/index.js');
var chokidar = require('chokidar');

app.use('/form', express.static(__dirname + '/index.html'));
app.use(fileUpload());

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname + '/uploads/' + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded to ' + uploadPath);
  });
});


var clients = 0;
io.on('connection', function(socket) {
   clients++;
//   socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
//   socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})

chokidar.watch('.\/uploads', { persistant: true }).on('all', (accessMode, path) => {
    console.log(accessMode, path);  
	socket.emit('newclientconnect',{ description: 'file uploaded : ' + path });
   socket.broadcast.emit('newclientconnect',{ description: 'file uploaded : ' + path })
});


   socket.on('disconnect', function () {
      clients--;
//      socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
   });
});

http.listen(3000, function() {
   console.log('listening on localhost:3000');
});