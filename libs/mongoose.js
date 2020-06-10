
const mongoose = require('mongoose');
const Config = require('./config');

mongoose.Promise = Promise;
const mongooseLogs = (process.env.NODE_ENV === 'development');
mongoose.set('debug', mongooseLogs);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(Config.mongoose.uri, Config.mongoose.options);

module.exports = mongoose;