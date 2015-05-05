
(function() {
    //main controller
    angular
        .module('watchThisApp', [])
        .controller('mainController', mainController);

    mainController.$inject = ['getPlayer', 'connectIo', '$scope'];

    function mainController(getPlayer, connectIo, $scope) {
        //Get embedded video
        getPlayer.loadYoutubeApi();

        //Start Socket Connection
        var socket = connectIo.socketInit();

        //nameSpace the controller. Vm(viewmodel) binds values
        var vm = this;

        //DOM manipulation, no jQuery = win
        vm.playVideo = playVideo;
        vm.startRoom = startRoom;
        vm.joinRoom = joinRoom;
        vm.user = {};
        vm.userRoom = '';
        vm.currentUsers = [];

        //definitions
        function playVideo () {
            socket.emit('playVideo', vm.user);
            getPlayer.startVideo();
        }

        function startRoom (user) {
            var userObj = user;
            socket.emit('newUserJoin', {
                user: user.name
            });
        }

        function joinRoom(roomName) {
            socket.emit('joinRoom', roomName);
        }

        //////Socket Stuff//////

        //play button//
        socket.on('play', function() {
            getPlayer.startVideo();
        })

        //fired once new user joins//
        socket.on('updateUserData', function(data) {

            $scope.$apply(function() {
                vm.currentUsers = data;
            })
        })

        socket.on('roomJoined', function() {
            console.log('joined the room!')
        })

    }
})();