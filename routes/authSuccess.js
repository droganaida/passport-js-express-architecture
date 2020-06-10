
const Users = require('../models/users').Users;

exports.get = async (req, res, next) => {

    try {
        if (req.session?.passport?.user) {

            console.log('PASSPORT USER:',req.session.passport.user);

            const userObj = {};
            userObj.email = req.session.passport.user.emails[0].value;
            userObj.firstName = req.session.passport.user?.name?.givenName || '';
            userObj.lastName = req.session.passport.user?.name?.familyName || '';
            userObj.avatar = req.session.passport.user?.photos[0]?.value || '';
            userObj.socialId = req.session.passport.user.id;
            userObj.provider = req.session.passport.user.provider;

            req.session.userId = await Users.findOne({socialId: userObj.socialId}, {_id: 1}).lean();
            req.session.userId = req.session.userId || (await Users.fullSave(userObj))._id;

            res.redirect('/profile');
        } else {
            next('Authentication error');
        }
    } catch (e) {
        next(e);
    }
};