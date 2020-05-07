const mongoose = require('mongoose');
const { connectionUrl } = require('./connection.js');

mongoose.connect(`${connectionUrl}`, {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true
}).then(res => console.log(`Connected to ${connectionUrl}!`));