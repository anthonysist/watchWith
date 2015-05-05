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
        var socket = io.connect();
        socket.on('news', function (data) {
            console.log(data);
            console.log('hit')
            socket.emit('my other event', {my: 'data'});
        });
    }
})();
