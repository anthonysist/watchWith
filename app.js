/**
 * Created by Anthony on 4/11/2015.
 */

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


server.listen(5000);

app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/css',  express.static(__dirname + '/deploy/css'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/deploy/index.html');
});

io.on('connection', function (socket) {
    socket.broadcast.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

