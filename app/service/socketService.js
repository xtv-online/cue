module.exports = function(server) {
    var io = require('socket.io')(server);
    var text = '';
    var countdown = 0;
    var flipState = false;

    io.on('connection', function(socket) {
        io.emit('options', {
            mirror: flipState
        });
        io.emit('currentContent', {
            content: text
        });
        io.emit('newContent', {
            content: text
        });

        socket.on('textBoxUpdate', function(data) {
            messageUpdate(data);
        });

        socket.on('setCountdown', function(data) {
            countdown = Date.now() + (data.value * 1000)
        });

        socket.on('options', function(data) {
            switch (data.value) {
                case 'flipImage':
                    flipState = !flipState;
                    io.emit('options', {
                        mirror: flipState
                    });
                    break;
            }
        });

        socket.on('disconnect', function() {
            console.log("disconnected");
        });

        setInterval(function() {
            io.emit('time', {
                currentText: getDateTime(),
                countdownText: getCountdown()
            })
        }, 100);

    });

    function messageUpdate(data) {
        text = data.content;
        io.emit('newContent', {
            content: text
        });
        console.log('Send new data', data);
    }

    function getDateTime() {
        var date = new Date();

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        return hour + ":" + min + ":" + sec;
    }

    function getCountdown() {
        var now = Date.now()
        var difference = (countdown - now)/1000;
        if (difference > 0) {
            var min = Math.floor(difference/60);
            var sec = Math.round((difference - min*60)*10)/10;
            return ((min < 10) ? '0' + min : min) + ":" + ((sec < 10) ? '0' + sec : sec) ;
        } else {
            return '0';
        }
    }
}
