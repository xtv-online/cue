var thinky = require('thinky')();
var type = thinky.type;


var User = thinky.createModel(
    'User', {
        id: type.string(),
        username: type.string(),
        password: type.string(),
        idSelectedDisplay: type.string()
    }
);

var Programme = thinky.createModel(
    'Programme', {
        id: type.string(),
        title: type.string(),
        deleted: Boolean,
        idActiveCue: type.string()
        idUsers: [type.string()],
        idOwner: type.string()
    }
);

var Cue = thinky.createModel(
    'Cue', {
        id: type.string(),
        page: type.number(),
        title: type.string(),
        text: type.string(),
        idProgramme: type.string()
    }
);

var Display = thinky.createModel(
    'Display', {
        id: type.string(),
        name: type.string(),
        resolutionX: type.number(),
        resolutionY: type.number(),
        colourBackground: type.string(),
        colourText: type.string(),
        idOwner: type.string()
    }
);

User.hasMany(Display, "displays", "id", "idOwner");
User.hasMany(Programme, "programmes", "id", "idOwner");
Programme.hasMany(Cue, "cues", "id", "idProgramme");

module.exports = {
    user: User,
    programme: Programme,
    cue: Cue,
    display: Display
}
