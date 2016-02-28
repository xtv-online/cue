module.exports = function(server) {
    var io = require('socket.io')(server);
    var db = require('./persistenceService');
    // TODO:
    // Convert all the mongoos queries to thinky queries
    // And make use of the model's relations and integrated JOINs
    var passwordHash = require('password-hash');

    io.on('connection', function(socket) {
        socket.auth = false;
        var user;
        var data;

        socket.on('authenticate', function(data) {
            db.User.get({ 'username': data.username }).then(function(userData) {
                if (passwordHash.verify(data.password, userData.password)) {
                    socket.auth = true;
                    user = userData;
                    console.log('Authenticated socket', socket.id, 'for', user.username);
                    socket.emit('authenticate', {
                        status: 'success',
                        username: userData.username
                    });
                    startup();
                } else {
                    socket.auth = false;
                    console.log('Could not authenticate', user.username, 'on', socket.id);
                    socket.emit('authenticate', {
                        status: 'failure'
                    });
                };
            })
        });

        socket.on('addProgramme', function(data) {
            if (socket.auth) {
                console.log('Saving new programme', data.programmeName, 'for', user.username);
                var programme = new db.programme({
                    programme: data.programmeName,
                    owner: user.id,
                    users: [user.id]
                });
                programme.save();
                user.programmes.push(programme.id);
                user.save();
                startup();
            }
        });

        socket.on('addDisplay', function(data) {
            if (socket.auth) {
                console.log('Saving new display', data.displayName, 'for', user.username);
                var display = new db.display({
                    name: data.displayName,
                    resolutionX: data.displayResolutionX,
                    resolutionY: data.displayResolutionY,
                    colourBackground: data.displayColourBackground,
                    colourText: data.displayColourText,
                    user: user.id
                });
                display.save();
                user.display.devices.push(display.id);
                user.save();
                startup();
            }
        });

        socket.on('setDisplay', function(deviceId) {
            if (socket.auth) {
                console.log('Setting current display to', deviceId, 'for', user.username);
                user.display.selected = deviceId;
                user.save();
                startup();
            }
        });

        socket.on('deleteProgramme', function(programmeId){
            if (socket.auth) {
                console.log('Deleting programme', programmeId, 'by', user.username);
                db.programme.findOne({_id: programmeId}).then(function (programme) {
                    programme.users.forEach(function(userId) {
                        db.user.findOne({_id: userId}).then(function (userData) {
                            var oldIndex = userData.programmes.indexOf(programmeId);
                            userData.programmes.splice(oldIndex, 1);
                            userData.save();
                            if (userData.id == user.id) {
                                user = userData;
                                console.log('Saving user..', user);
                                startup()
                            }
                        });
                    });
                });
                db.programme.findByIdAndRemove(programmeId).exec();
            };
        });

        socket.on('deleteDevice', function(deviceId){
            if (socket.auth) {
                console.log('Deleting device', deviceId, 'by', user.username);
                db.display.findOne({_id: deviceId}).then(function (display) {
                    db.user.findOne({_id: display.user}).then(function (userData) {
                        var oldIndex = userData.display.devices.indexOf(deviceId);
                        userData.display.devices.splice(oldIndex, 1);
                        userData.display.selected = "";
                        userData.save();
                        if (userData.id == user.id) {
                            user = userData;
                            console.log('Saving user..', user);
                            startup()
                        }
                    });
                });
                db.display.findByIdAndRemove(deviceId).exec();
            };
        });

        socket.on('getProgramme', function(programmeId) {
            if (socket.auth) {
                console.log('Getting programme', programmeId, 'for', user.username);
                db.programme.findOne({_id: programmeId}).then(function (programme) {
                    socket.emit('programme', programme);
                });
            };
        });

        socket.on('getDevice', function(deviceId) {
            if (socket.auth) {
                console.log('Getting device', deviceId, 'for', user.username);
                db.display.findOne({_id: deviceId}).then(function (deviceData) {
                    socket.emit('device', deviceData);
                });
            }
        });

        socket.on('getDisplay', function(deviceId) {
            if (socket.auth) {
                console.log('Getting display', deviceId, 'for', user.username);
                db.display.findOne({_id: deviceId}).then(function (device) {
                    socket.emit('display', device);
                });
            }
        });

        function startup() {
            if (socket.auth) {
                socket.emit('reload', {
                    user: user
                });
            }
        };
    });
    // io.on('connection', function(socket) {
    //     io.emit('options', {
    //         mirror: flipState
    //     });
    //     io.emit('currentContent', {
    //         content: text
    //     });
    //     io.emit('newContent', {
    //         content: text
    //     });
    //     sendCueList();
    //
    //     socket.on('textBoxUpdate', function(data) {
    //         messageUpdate(data);
    //     });
    //
    //     socket.on('saveCue', function(data) {
    //         savedCues[data.title] = data.content;
    //         sendCueList();
    //     });
    //
    //     socket.on('deleteCue', function(data) {
    //         console.log('deleting cue', data.title);
    //         delete savedCues[data.title];
    //         sendCueList();
    //     });
    //
    //     socket.on('setCountdown', function(data) {
    //         countdown = Date.now() + (data.value * 1000)
    //     });
    //
    //     socket.on('options', function(data) {
    //         switch (data.action) {
    //             case 'flipImage':
    //                 flipState = !flipState;
    //                 io.emit('options', {
    //                     mirror: flipState
    //                 });
    //                 break;
    //             case 'scrollDown':
    //                 clearInterval(scrollAction);
    //                 startScrolling('down');
    //                 io.emit('scrollButton', 'down');
    //                 break;
    //             case 'scrollUp':
    //                 clearInterval(scrollAction);
    //                 startScrolling('up');
    //                 io.emit('scrollButton', 'up');
    //                 break;
    //             case 'scrollTop':
    //                 scrollPosition = 0;
    //                 clearInterval(scrollAction);
    //                 io.emit('scrollButton', 'stopped');
    //                 io.emit('scroll', 'top');
    //                 break;
    //             case 'stopScrolling':
    //                 clearInterval(scrollAction);
    //                 io.emit('scrollButton', 'stopped');
    //                 break;
    //             case 'scrollSpeed':
    //                 if (data.increase) {
    //                     scrollSpeed = scrollSpeed + 5;
    //                 } else if (scrollSpeed > 5) {
    //                     scrollSpeed = scrollSpeed - 5;
    //                 }
    //                 break;
    //         }
    //     });
    //
    //     socket.on('disconnect', function() {
    //         console.log('disconnected');
    //     });
    //
    //     setInterval(function() {
    //         io.emit('time', {
    //             currentText: getDateTime(),
    //             countdownText: getCountdown()
    //         })
    //     }, 100);
    //
    // });

    function messageUpdate(data) {
        text = data.content;
        io.emit('newContent', {
            content: text
        });
    }

    function startScrolling(direction) {
        io.emit('scroll', {
            position: scrollPosition + 'px',
            duration: 200
        });
        scrollAction = setInterval(function() {
            scrollPosition = (direction == 'down') ? (scrollPosition + scrollSpeed) : (scrollPosition - scrollSpeed);
            io.emit('scroll', {
                position: scrollPosition + 'px',
                duration: 200
            });
        }, 200);
    }


    function getDateTime() {
        var date = new Date();

        var hour = date.getHours();
        hour = (hour < 10 ? '0' : '') + hour;

        var min = date.getMinutes();
        min = (min < 10 ? '0' : '') + min;

        var sec = date.getSeconds();
        sec = (sec < 10 ? '0' : '') + sec;

        return hour + ':' + min + ':' + sec;
    }

    function getCountdown() {
        var now = Date.now()
        var difference = (countdown - now) / 1000;
        if (difference > 0) {
            var min = Math.floor(difference / 60);
            var sec = Math.round((difference - min * 60) * 10) / 10;
            return ((min < 10) ? '0' + min : min) + ':' + ((sec < 10) ? '0' + sec : sec);
        } else {
            return '0';
        }
    }

    function sendCueList() {
        io.emit('cueList', savedCues)
    }
}
