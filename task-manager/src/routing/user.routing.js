const express = require('express');
let app = express();
const User = require('./../db/models').modelUser;

const route = (_app) => {
    app = _app;

    app.post('/users', async (req, res) => {
        const user = new User(req.body);
        try {
            await user.save();
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    })

    app.get('/users', async (req, res) => {
        try {
            const users = await User.find({});
            res.send(users);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.get('/users/:id', async (req, res) => {
        try {
            const id = req.params['id'];
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).send(`User with id '${id}' not found`);
            }
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send(error)
        }
    });
}

module.exports = { route };