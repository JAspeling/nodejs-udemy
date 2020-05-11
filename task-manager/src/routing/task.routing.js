const express = require('express');
const router = new express.Router();
const Task = require('./../db/models/task');

const auth = require('../middleware/authentication');

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);

    } catch (error) {
        res.status(400).send(error)
    }
})

// GET /tasks?completed=true
// GET /tasks?limit=10
// GET /tasks?skip=10
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    try {
        // const tasks = await Task.find({ owner: req.user._id });
        // res.send(tasks);

        const match = {}
        // Ascending = 1
        // Descending: -1
        const sort = {};

        if (req.query.completed) {
            match.completed = req.query.completed.toLowerCase() === 'true';
        }

        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1].toLowerCase() === 'asc' ? 1 : -1;
        }

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.send(req.user.tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send(`Task with id '${_id}' not found.`)
        }


        res.status(200).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['description', 'completed'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(key => allowedUpdates.includes(key));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update' });
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send(`Task with id '${id}' not found`);
        }

        updates.forEach(key => task[key] = req.body[key]);

        task.save();

        return res.send(task);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {

    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send(`Task with id '${req.params.id}' not found`);
        }

        return res.send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});


module.exports = router;