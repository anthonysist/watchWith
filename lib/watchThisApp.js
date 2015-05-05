(function() {
    //main angular app
    angular
        .module('watchThisApp', [])
        .controller('mainController', mainController);

    mainController.$inject = ['getPlayer', 'connectIo'];
    function mainController(getPlayer) {
        console.log("okay, we're in");
        getPlayer.loadYoutubeApi();

        connectIo.socketInit();
    }
})();