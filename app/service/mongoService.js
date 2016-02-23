var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/cue');

var user = mongoose.model(
    'User', {
        username: String,
        password: String,
        programmes: [Schema.Types.ObjectId],
        display: {
            selected: Schema.Types.ObjectId,
            devices: [Schema.Types.ObjectId]
        }
    }
);

var programme = mongoose.model(
    'Programme', {
        programme: String,
        users: [Schema.Types.ObjectId],
        owner: Schema.Types.ObjectId,
        deleted: Boolean,
        cues: [Schema.Types.ObjectId],
        activeCue: Schema.Types.ObjectId,
        scrollSpeed: { type: Number, default: 20 },
        scrollPosition: { type: Number, default: 0 },
    }
);

var cue = mongoose.model(
    'Cue', {
        page: Number,
        title: String,
        text: String
    }
);

var display = mongoose.model(
    'Display', {
        name: String,
        resolutionX: Number,
        resolutionY: Number,
        colourBackground: String,
        colourText: String,
        user: Schema.Types.ObjectId
    }
);

module.exports = {
    user: user,
    programme: programme,
    cue: cue,
    display: display
}
