const router = require('express').Router();
const { Thought, User } = require('../../models');

router.get('/', async (req, res) => {
    const result = await Thought.find({}).catch(err => err);
    res.json(result);
});

router.get('/:id', async (req, res) => {
    const result = await Thought.findOne({ _id: req.params.id }).catch(err => err);
    if(!result) res.json({message: 'No thought found!'});
    res.json(result);
});

router.post('/', async (req, res) => {
    try {
        const result = await Thought.create(req.body);
        await User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: result._id }});
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

router.put('/:id', async (req, res) => {
    const result = await Thought.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}).catch(err => err);
    if(!result) res.json({message: 'No thought found!'});
    res.json(result);
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Thought.findOneAndDelete({ _id: req.params.id });
        if(!result) return res.json({message: 'No thought found!'});
        await User.findOneAndUpdate({ username: result.username }, { $pull: { thoughts: result._id }});
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

router.post('/:thoughtId/reactions', async (req, res) => {
    const result = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body }}, {new: true}).catch(err => err);
    if(!result) res.json({message: 'No thought found!'});
    res.json(result);
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    const result = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId }}}, {new: true}).catch(err => err);
    if(!result) res.json({message: 'No thought found!'});
    res.json(result);
});

module.exports = router;