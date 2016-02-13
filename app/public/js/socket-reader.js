$(function() {
    var mirror = false;
    console.log('Establishing Socket Connection');
    var socket = io.connect(location.host);
    socket.emit('requestData');

    socket.on('newContent', function (data) {
        $('#text').html(data.content);
    });
    socket.on('time', function (data) {
        $('#time').html("NOW: " + data.currentText + "<br />NEXT: " + data.countdownText);
    });

    socket.on('scroll', function(data) {
        if (data == 'top') {
            $('#text').scrollTo(0);
        } else {
            $('#text').scrollTo(
                data.position,
                data.duration,
                {easing: 'swing'}
            );
        }
    });

    $('body').on({ 'touchstart' : function(){
        mirror = !mirror;
        if (mirror) {
            $('#text').css({
              '-webkit-transform' : 'scale(-1, 1)',
              '-moz-transform'    : 'scale(-1, 1)',
              '-ms-transform'     : 'scale(-1, 1)',
              '-o-transform'      : 'scale(-1, 1)',
              'transform'         : 'scale(-1, 1)'
            });
            $('#time').css({
              '-webkit-transform' : 'scale(-1, 1)',
              '-moz-transform'    : 'scale(-1, 1)',
              '-ms-transform'     : 'scale(-1, 1)',
              '-o-transform'      : 'scale(-1, 1)',
              'transform'         : 'scale(-1, 1)'
            });
        }
        else {
            $('#text').css({
              '-webkit-transform' : 'scale(1, 1)',
              '-moz-transform'    : 'scale(1, 1)',
              '-ms-transform'     : 'scale(1, 1)',
              '-o-transform'      : 'scale(1, 1)',
              'transform'         : 'scale(1, 1)'
            });
            $('#time').css({
              '-webkit-transform' : 'scale(1, 1)',
              '-moz-transform'    : 'scale(1, 1)',
              '-ms-transform'     : 'scale(1, 1)',
              '-o-transform'      : 'scale(1, 1)',
              'transform'         : 'scale(1, 1)'
            });
        }
    }});


    $('body').on('click', function(){
        mirror = !mirror;
        if (mirror) {
            $('#text').css({
              '-webkit-transform' : 'scale(-1, 1)',
              '-moz-transform'    : 'scale(-1, 1)',
              '-ms-transform'     : 'scale(-1, 1)',
              '-o-transform'      : 'scale(-1, 1)',
              'transform'         : 'scale(-1, 1)'
            });
            $('#time').css({
              '-webkit-transform' : 'scale(-1, 1)',
              '-moz-transform'    : 'scale(-1, 1)',
              '-ms-transform'     : 'scale(-1, 1)',
              '-o-transform'      : 'scale(-1, 1)',
              'transform'         : 'scale(-1, 1)'
            });
        }
        else {
            $('#text').css({
              '-webkit-transform' : 'scale(1, 1)',
              '-moz-transform'    : 'scale(1, 1)',
              '-ms-transform'     : 'scale(1, 1)',
              '-o-transform'      : 'scale(1, 1)',
              'transform'         : 'scale(1, 1)'
            });
            $('#time').css({
              '-webkit-transform' : 'scale(1, 1)',
              '-moz-transform'    : 'scale(1, 1)',
              '-ms-transform'     : 'scale(1, 1)',
              '-o-transform'      : 'scale(1, 1)',
              'transform'         : 'scale(1, 1)'
            });
        }
    });

});
