const { Schema, model, Types } = require('mongoose');

const formatTimestamp = date => Intl.DateTimeFormat('en').format(date);

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
        required: 'Username is required.',
        immutable: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: formatTimestamp
    }
}, { toJSON: { getters: true }});

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
        required: 'Username is required.',
        immutable: true
    },
    reactions: [reactionSchema]
}, { toJSON: { getters: true }});

thoughtSchema.virtual('reactionCount').get(function ()  { return this.reactions.length });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;