$(function() {
    $('#login').click(function(){
        console.log('Attempting log in', $('#username').val());
        $('#username').val();
        $('#password').val();
        var socket = io.connect(location.host);
        socket.emit('authenticate', {
            username: $('#username').val(),
            password: $('#password').val()
        });
    });
});
