const { Schema, model, Types } = require('mongoose');

const formatTimestamp = date => Intl.DateTimeFormat('en').formatToParts();

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: 'Reaction is required.',
        minlength: 1,
        maxlength: 280
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
        minlength: 1,
        maxlength: 280
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

thoughtSchema.virtual('reactionCount').get(() =>  this.reactions.length);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;