$(function() {
    console.log('Establishing Socket Connection')
    var socket = io.connect('http://localhost:3000');

    socket.on('currentContent', function (data) {
      $('#niks-text-box').val(data.content)
    });

    socket.on('time', function (data) {
        $('.current').text("NOW: " + data.currentText + " | NEXT: " + data.countdownText);
    });

    socket.on('options', function (data) {
        if (data.mirror) {
            $('#flip-image').addClass('btn-success');
        } else {
            $('#flip-image').removeClass('btn-success');
        }
    });

    $('#niks-text-box').on('input', function(){
      socket.emit('textBoxUpdate', { content: $('#niks-text-box').val() });
    });

    $( "#flip-image" ).click(function() {
      socket.emit('options', { value: 'flipImage' });
    });

    $( "#5s" ).click(function() {
      socket.emit('setCountdown', { value: 5 });
    });

    $( "#10s" ).click(function() {
      socket.emit('setCountdown', { value: 10 });
    });

    $( "#30s" ).click(function() {
      socket.emit('setCountdown', { value: 30 });
    });

    $( "#1m" ).click(function() {
      socket.emit('setCountdown', { value: 60 });
    });

    $( "#2m" ).click(function() {
      socket.emit('setCountdown', { value: 120 });
    });

    $( "#3m" ).click(function() {
      socket.emit('setCountdown', { value: 180 });
    });
});
