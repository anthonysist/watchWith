/**
 * Created by anthony on 5/4/15.
 */

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
