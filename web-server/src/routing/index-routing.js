const route = (app) => {
    app.get('', (reg, res) => {
        res.render('index', {
            title: 'Weather app',
            author: 'Johan Aspeling'
        })
    });
};

module.exports = { route };