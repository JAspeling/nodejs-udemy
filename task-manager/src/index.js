const express = require('express');
require('./db/mongoose');

const userRouter = require('./routing/user.routing');
const taskRouter = require('./routing/task.routing');

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    // Check for maintenance flag in some environment variable
    if (false)
        return res.status(503).send('Site is under maintenance');

    next();
})

// Without Middleware:   new request ->                 run route handler
// With Middleware:      new Request -> do something -> run route handler

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

const jwt = require('jsonwebtoken');

const myFunc = async () => {
    // const token = jwt.sign({ _id: 'abc123' }, 'This is my new course', { expiresIn: '7 days' });

    // console.log(token);

    // const payload = jwt.verify(token, 'This is my new course');
    // console.log(payload);
}

myFunc();

const User = require('./db/models/user');
const Task = require('./db/models/task');

const relationship = async () => {
    // const task = await Task.findById('someId');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);

    const user = await User.findById('someId');
    user.populate('tasks').execPopulate();
    console.log(user.tasks);
}