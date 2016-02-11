module.exports = function(server) {
    var io = require('socket.io')(server);
    var text = '';

    io.on('connection', function(socket) {
        socket.on('text-box-update', function(data) {
            messageUpdate(data);
        });

        socket.on('requestData', function(){
            io.emit('current-content', {content: text});
            io.emit('new-content', {content: text});
        });

        socket.on('disconnect', function() {
            console.log("disconnected");
        });
    });

    function messageUpdate(data) {
        text = data.content;
        io.emit('new-content', {
            content: text
        });
        console.log('Send new data', data);
    }
}
