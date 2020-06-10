
module.exports = (app, passport) => {

    const mainRoute = require('./main');
    app.get('/', mainRoute.get);

    const profileRoute = require('./profile');
    app.get('/profile', profileRoute.get);

    //================= Social Auth
    const networks = ['google', 'facebook', 'vkontakte'];
    networks.forEach(network => {

        app.get(`/registration/${network}`, (request, response) => {
            passport.authenticate(network, {
                scope:'email'
            })(request, response);
        });

        app.get(`/registration/${network}/callback`, (request, response) => {
            passport.authenticate(network, {
                successRedirect: '/auth-success',
                failureRedirect: '/auth-error'
            })(request, response);
        });
    });

    const authSuccess = require('./authSuccess');
    app.get('/auth-success', authSuccess.get);

    //================= logout
    const logoutRoute = require('./logout');
    app.get('/logout', logoutRoute.get);
};
