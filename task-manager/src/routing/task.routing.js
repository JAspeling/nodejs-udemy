const express = require('express');
let app = express();
const Task = require('./../db/models').modelTask;

const route = (_app) => {
    app = _app;

    app.post('/tasks', async (req, res) => {
        const task = new Task(req.body);

        try {
            await task.save();
            res.status(201).send(task);

        } catch (error) {
            res.status(400).send(error)
        }
    })

    app.get('/tasks', async (req, res) => {
        try {
            const tasks = await Task.find({});
            res.status(200).send(tasks);
        } catch (error) {
            res.status(500).send(error)
        }
    });

    app.get('/tasks/:id', async (req, res) => {
        try {
            const id = req.params['id'];
            const task = await Task.findById(id);
            if (!task) {
                return res.status(404).send(`Task with id '${id}' not found`)
            }
            res.status(200).send(task);
        } catch (error) {
            res.status(500).send(error)
        }
    });

    app.delete('/tasks/:id', async (req, res) => {

        try {
            const id = req.params['id'];
            const task = await Task.findByIdAndDelete(id)

            console.log(`Task with id ${id} deleted`, task);

            const count = await Task.countDocuments({ completed: false });
            res.send({
                id: task.id,
                incomplete: `${count} incomplete tasks remaining.`
            })
        } catch (error) {
            res.status(500).send(error)
        }
    })
}


module.exports = { route };