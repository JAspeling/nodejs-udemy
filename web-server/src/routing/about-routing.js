const route = (app) => {
    app.get('/about', (reg, res) => {
        res.render('about', {
            title: 'About',
            author: 'Johan Aspeling'
        })
    });
}

module.exports = { route };