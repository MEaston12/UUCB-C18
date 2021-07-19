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
    thoughts: [Number],
    friends: [Number]
});

userSchema.virtual('friendCount').get(() =>  this.friends.length);

const User = model('User', userSchema);

module.exports = User;