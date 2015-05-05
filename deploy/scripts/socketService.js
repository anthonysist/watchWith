
(function() {
    //initialize player
    angular
        .module('watchThisApp')
        .factory('connectIo', connectIo);

    function connectIo() {
        return {socketInit : socketInit};
    }

    function socketInit () {
        return io.connect();

    }
})();
