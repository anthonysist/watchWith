

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



//socket stuff, move eventually

var currentUsers = [];


io.on('connection', function (socket) {
    console.log(socket.id);

    io.sockets.emit('updateUserData', currentUsers);

    socket.on('playVideo', function (data) {

        io.to('anthony').emit('play');
    });

    socket.on('newUserJoin', function (data) {
        currentUsers.push(data);
        console.log(socket.id);
        rooms.push({'name' : data.user, 'id' : socket.id})
        socket.join(data.user);
        io.sockets.emit('updateUserData', currentUsers);
    });

    socket.on('joinRoom', function (data) {
        console.log(data)
        socket.join(data);
        io.sockets.emit('roomJoined');
    })
});

