$(function() {
    console.log('Establishing Socket Connection')
    var socket = io.connect(location.host);

    socket.on('currentContent', function (data) {
      $('#niks-text-box').val(data.content)
    });

    socket.on('scroll', function(data) {
        if (data == 'top') {
            $('#text-preview').scrollTo(0);
        } else {
            $('#text-preview').scrollTo(
                data.position,
                data.duration,
                {easing: 'swing'}
            );
        }
    });

    socket.on('scrollButton', function(data) {
        switch (data) {
            case 'up':
                $( "#scroll-text-up" ).addClass('btn-danger');
                $( "#scroll-text-down" ).removeClass('btn-danger');
                break;
            case 'down':
                $( "#scroll-text-down" ).addClass('btn-danger');
                $( "#scroll-text-up" ).removeClass('btn-danger');
                break;
            case 'stopped':
                $( "#scroll-text-up" ).removeClass('btn-danger');
                $( "#scroll-text-down" ).removeClass('btn-danger');
                break;
        }

    });

    socket.on('newContent', function (data) {
        $('#text-preview').html(data.content);
    });

    socket.on('time', function (data) {
        $('.current').text("NOW: " + data.currentText + " | NEXT: " + data.countdownText);
    });

    socket.on('cueList', function (data) {
        $('#cue-list').html("");
        for (var cueTitle in data) {
            $('#cue-list').append('<tr><td>' + cueTitle + '</td><td><button value="' + data[cueTitle] + '" class="btn btn-default load-cue">Load</button></td><td><button value="' + cueTitle + '" class="btn btn-default delete-cue">Delete</button></td></tr>');
            console.log('Got new cues', cueTitle, data[cueTitle]);
        }
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

    $('#cue-list').on('click', '.load-cue', function(){
        $('#niks-text-box').val($(this).val());
        $('#title-name').val('');
        socket.emit('textBoxUpdate', { content: $('#niks-text-box').val() });
    });

    $('#cue-list').on('click', '.delete-cue', function(){
        socket.emit('deleteCue', {
            title: $(this).val()
        });
    });

    $('#save-cue').click(function(){
      console.log('saving cue', $('#title-name').val());
      var cueData = {
          title: $('#title-name').val(),
          content: $('#niks-text-box').val()
      };
      socket.emit('saveCue', cueData);
    });

    $( "#flip-image" ).click(function() {
      socket.emit('options', { action: 'flipImage' });
    });

    $( "#scroll-text-down" ).click(function() {
        var data = {}
        if ($( '#scroll-text-down' ).hasClass('btn-danger')) {
            data.action = 'stopScrolling'
        } else {
            data.action = 'scrollDown'
        }
        socket.emit('options', data);
    });

    $( "#scroll-speed-increase" ).click(function() {
        socket.emit('options', {
            action: 'scrollSpeed',
            increase: true
        });
    });

    $( "#scroll-speed-decrease" ).click(function() {
        socket.emit('options', {
            action: 'scrollSpeed',
            increase: false
        });
    });

    $( "#scroll-text-up" ).click(function() {
        var data = {}
        if ($( '#scroll-text-up' ).hasClass('btn-danger')) {
            data.action = 'stopScrolling'
        } else {
            data.action = 'scrollUp'
        }
        socket.emit('options', data);
    });

    $( "#scroll-text-top" ).click(function() {
        socket.emit('options', {action: 'scrollTop'});
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
