$(function() {
    console.log('Establishing Socket Connection')
    var socket = io.connect('http://localhost:3000');
    socket.emit('requestData');
    socket.on('new-content', function (data) {
      console.log("New content:", data);
      $('#content').text(data.content);
    });
});
