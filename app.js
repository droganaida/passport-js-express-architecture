
const express = require('express');
const session = require('express-session');
const path = require('path');
const helmet = require('helmet');

const Config = require('./libs/config');
const common = require('./common');

const app = express();

app.use(helmet());
//================= Templates
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');
app.set('view options', {compileDebug: false, self: true, cache: true});
app.use(express.static(path.join(__dirname, 'public')));

//================= Session
const sessionStore = require('./libs/sessionStore');
app.use(session({
    secret: Config.session.secret,
    key: Config.session.key,
    cookie: Config.session.cookie,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}));

//================= Social Auth
const passport = require('passport');
require('./libs/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

//================= Common middleware
app.use(common.commonMW);

//================= Routing
require('./routes')(app, passport);

//================= Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(502);
    res.render('./error', {errorMsg: 'Server Error'});
});
app.use((req, res) => {
    res.status(404);
    res.render('./error', {errorMsg: 'Not Found'});
});

app.listen(Config.port, () => {
    console.log(`Listening on port ${Config.port}!`);
});