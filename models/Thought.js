const { Schema, model, Types } = require('mongoose');

const formatTimestamp = date => Intl.DateTimeFormat('en').formatToParts();

const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: 'Reaction is required.',
        match: /.{1-280}/
    },
    username: {
        type: String,
        required: 'Username is required.'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: formatTimestamp
    }
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Thought text is required.',
        match: /.{1-280}/
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: formatTimestamp
    },
    username: {
        type: String,
        required: 'Username is required.'
    },
    reactions: [reactionSchema]
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;