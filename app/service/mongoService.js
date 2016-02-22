var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

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
        scrollSpeed: Number,
        scrollPosition: Number
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
        resolution-x: Number,
        resolution-y: Number,
        colour-background: String,
        colour-text: String
    }
);

module.exports = {
    user: user,
    programme: programme,
    cue: cue,
    display: display
}
