$(function() {
    var user;
    var socket = io.connect(location.host);;
    $('#logInModal').modal('show');

    // CALLERS

    $('#login').click(function(){
        console.log('Attempting log in', $('#username').val());
        $('#username').val();
        $('#password').val();
        socket.emit('authenticate', {
            username: $('#username').val(),
            password: $('#password').val()
        });
    });

    $('#save-programme').click(function(){
        var newProgramme = {
            programmeName: $('#new-programme').val(),
        };
        console.log('Saving new programme', newProgramme);
        socket.emit('addProgramme', newProgramme);
    })

    $('#save-display').click(function(){
        var newDisplay = {
            displayName: $('#display-name').val(),
            displayResolutionX: $('#display-resolution-x').val(),
            displayResolutionY: $('#display-resolution-y').val(),
            displayColourBackground: $('#display-colour-background').val(),
            displayColourText: $('#display-colour-text').val(),
        };
        console.log('Saving new programme', newDisplay);
        socket.emit('addDisplay', newDisplay);
    })


    $('#programme-list').on('click', '.delete-programme', function(){
        var programmeId = $(this).val();
        console.log('Deleting programme', programmeId);
        socket.emit('deleteProgramme', programmeId);
    });

    $('#device-list').on('click', '.delete-device', function(){
        var deviceId = $(this).val();
        console.log('Deleting device', deviceId);
        socket.emit('deleteDevice', deviceId);
    });

    $('#device-list').on('click', '.set-device', function(){
        var deviceId = $(this).val();
        console.log('Setting display', deviceId);
        socket.emit('setDisplay', deviceId);
    });


    // LISTENERS

    socket.on('authenticate', function(data){
        if (data.status =='success') {
            $('#logInModal').modal('hide');
            $('#welcome-body').text('You\'re logged in as ' + data.username);
        };
    });

    socket.on('reload', function(userData) {
        console.log('RELOAD', userData);
        user = userData.user;
        $('#programme-list').html("");
        $('#device-list').html("");
        $('#preview-body').css("height", "auto");
        $('#preview-body').html("");
        // empty rest
        user.programmes.forEach(function(programmeId) {
            socket.emit('getProgramme', programmeId);
        });
        user.display.devices.forEach(function(deviceId) {
            socket.emit('getDevice', deviceId);
        });
        if (user.display.selected) {socket.emit('getDisplay', user.display.selected)};
    });

    socket.on('programme', function(programmeData) {
        console.log('Got programme data', programmeData);
        $('#programme-list').append('<tr><td>' + programmeData['programme'] + '</td><td><button value="' + programmeData['_id'] + '" class="btn btn-default load-programme">Load</button></td><td><button value="' + programmeData['_id'] + '" class="btn btn-default delete-programme">Delete</button></td></tr>');
    })

    socket.on('device', function(deviceData) {
        console.log('Got device data', deviceData);
        $('#device-list').append('<tr><td>' + deviceData['name'] + '</td><td><button value="' + deviceData['_id'] + '" class="btn btn-default set-device">Set</button></td><td><button value="' + deviceData['_id'] + '" class="btn btn-default delete-device">Delete</button></td></tr>');
    })

    socket.on('display', function(displayData) {
        console.log('Got display', displayData);
        $('#preview-body').css('height', (displayData.resolutionY + 4));
        $('#preview-body').html('<div style="position:absolute;top:40px;bottom:2px;width:' + displayData.resolutionX + 'px;height:' + displayData.resolutionY + 'px;background-color:' + displayData.colourBackground + ';color:' + displayData.colourText + ';">');
    });
});
