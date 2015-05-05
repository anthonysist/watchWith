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
        connectIo.socketInit();

        var vm = this;

        vm.playVideo = function() {
            console.log(getPlayer.startVideo())
            getPlayer.startVideo()
        }
    }
})();