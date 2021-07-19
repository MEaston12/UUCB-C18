const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
    const result = await User.find({}).catch(err => err);
    res.json(result);
});

router.get('/:id', async (req, res) => {
    const result = await User.findOne({ _id: req.params.id }).catch(err => err);
    if(!result) res.json({message: 'No user found!'});
    res.json(result);
});

router.post('/', async (req, res) => {
    const result = await User.create(req.body).catch(err => err);
    res.json(result);
});

router.put('/:id', async (req, res) => {
    const result = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}).catch(err => err);
    if(!result) res.json({message: 'No user found!'});
    res.json(result);
});

router.delete('/:id', async (req, res) => {
    const result = await User.findOneAndDelete({ _id: req.params.id }).catch(err => err);
    if(!result) res.json({message: 'No user found!'});
    res.json(result);
});

router.post('/:userId/friends/:friendId', async (req, res) => {
    const result = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId }}, {new: true}).catch(err => err);
    if(!result) res.json({message: 'No user found!'});
    res.json(result);
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
    const result = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId }}, {new: true}).catch(err => err);
    if(!result) res.json({message: 'No user found!'});
    res.json(result);
});

module.exports = router;