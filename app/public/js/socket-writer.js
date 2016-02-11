$(function() {
    console.log('Establishing Socket Connection')
    var socket = io.connect('http://localhost:3000');
    socket.emit('requestData');

    socket.on('current-content', function (data) {
      $('#niks-text-box').val(data.content)
    });

    socket.on('new-content', function (data) {
      console.log(data);
    });

    $('#niks-text-box').on('input', function(){
      socket.emit('text-box-update', { content: $('#niks-text-box').val() });
    });
});
