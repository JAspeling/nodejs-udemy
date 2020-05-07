const express = require('express');
require('./db/mongoose');
const User = require('./db/models').modelUser;
const Task = require('./db/models').modelTask;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

require('./routing/task.routing').route(app);
require('./routing/user.routing').route(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})