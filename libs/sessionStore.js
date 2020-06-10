
const session = require('express-session');
const mongoose = require('./mongoose');
const mongoStore = require('connect-mongo')(session);

const sessionStore = new mongoStore({mongooseConnection: mongoose.connection});

module.exports = sessionStore;