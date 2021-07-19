const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required.',
        trim: true
    },
    email: {
        type: String,
        required: 'Valid email is required.',
        match: /.+\@.+\..+/,
        unique: true
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { toJSON: { getters: true }});

userSchema.virtual('friendCount').get(function (){return this.friends.length});

const User = model('User', userSchema);

module.exports = User;