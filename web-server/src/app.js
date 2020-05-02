const path = require('path');

const express = require('express');

const publicPath = path.join(__dirname, '../public');

console.log(publicPath)

const app = express();

// Set up handle bars in express.
app.set('view engine', 'hbs');

app.use(express.static(publicPath));

app.get('', (reg, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Johan Aspeling'
    })
});

app.get('/about', (reg, res) => {
    res.render('about', {
        title: 'About',
        name: 'Johan Aspeling'
    })
});

app.get('/help', (reg, res) => {
    res.render('help', {
        title: 'Help',
        message: `This is the help page which isn't very helpful at the moment.`
    })
});

// app.use(express.static())


app.get('/weather', (req, res) => {
    res.send({
        name: 'Johan',
        age: 29
    });
});

app.listen(3000, () => {
    console.log('Server started');
});
