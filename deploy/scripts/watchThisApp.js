/**
 * Created by Anthony on 4/12/2015.
 */
(function() {
    //main angular app
    angular
        .module('watchThisApp', [])
        .controller('mainController', mainController);

    mainController.$inject = ['getPlayer', 'connectIo'];

    function mainController(getPlayer, connectIo) {
        //Get embedded video
        getPlayer.loadYoutubeApi();

        //Start Socket Connection
        var socket = connectIo.socketInit();

        var vm = this;

        vm.playVideo = playVideo;
        vm.startRoom = startRoom;

        function playVideo () {
            socket.emit('playVideo', { play: 'video'});
            getPlayer.startVideo();
        }

        function startRoom () {

        }

        //////Socket Stuff//////

        //play button//
        socket.on('play', function() {
            console.log('play button hit');
            getPlayer.startVideo();
        })


    }
})();