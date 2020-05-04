const route = (app) => {
    app.get('/help', (reg, res) => {
        res.render('help', {
            title: 'Help',
            message: `This is the help page which isn't very helpful at the moment.`,
            author: 'Johan Aspeling'
        })
    });

    app.get('/help/*', (reg, res) => {
        res.render('404', {
            title: 'Help',
            message: 'Help article not found!',
        })
    });
}

module.exports = { route };