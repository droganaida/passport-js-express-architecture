
const Users = require('./models/users').Users;

module.exports.commonMW = async (req, res, next) => {

    res.locals.title = 'Simple Passport.js demo';
    res.locals.fullYear = (new Date()).getFullYear();
    res.locals.userProfile = '';

    if (req.session.userId) {
        res.locals.userProfile = await Users.findOne({_id: req.session.userId});
    }
    next();
};