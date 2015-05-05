/**
 * Created by Anthony on 4/11/2015.
 */

    ///Required Modules
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//listen on server (express init)
server.listen(5000);

//Middleware, serve the requested files from server (perf issues??)
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/css',  express.static(__dirname + '/deploy/css'));
app.use('/images',  express.static(__dirname + '/deploy/images'));
app.use('/scripts',  express.static(__dirname + '/deploy/scripts'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/deploy/index.html');
});

app.get('/theater', function (req, res) {
    res.sendFile(__dirname + '/deploy/theater.html');
});


//socket stuff, move eventually
io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

