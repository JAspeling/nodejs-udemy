const route = (app) => {
    app.get('*', (req, resp) => {
        resp.render('404', {
            title: 'Page does not exist',
            message: 'The requested page does not exist!'
        });
    });
};

module.exports = { route };