const express = require('express');
const router = new express.Router();
const User = require('./../db/models/user');
const auth = require('../middleware/authentication');

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const token = await user.generateAuthToken();
        await user.save();

        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();

        res.send('Logged out successfully.');
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send('Logged out of all platforms successfully.');
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(key => allowedUpdates.includes(key));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates' });
    }

    try {
        // new: true =              return the new user as opposed to the existing on the before the update.
        // runValidators: true =    Runs the validators when the user is updated.

        // Note: this is not listening to the middleware 
        // const user = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        updates.forEach(key => req.user[key] = req.body[key])
        await req.user.save();

        res.send(req.user);
    } catch (error) {
        console.error(error);
        // TODO: Need to check for network failure
        res.status(400).send(error);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();

        return res.send(req.user);
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;