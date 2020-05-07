const path = require('path');

const express = require('express');
const hbs = require('hbs');

// require ('./utils/proxy');

// Define path for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();
const port = process.env.PORT || 3001;

// Set up handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up the static directory to serve
app.use(express.static(publicPath));

require('./routing/index-routing').route(app);
require('./routing/help-routing').route(app);
require('./routing/weather-routing').route(app);
require('./routing/about-routing').route(app);

app.listen(port, () => {
    console.log(`Server , listening on port ${port}`);
});
