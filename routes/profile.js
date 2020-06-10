
exports.get = async (req, res, next) => {

    if (req.session.userId){
        res.locals.title = 'My profile';
        res.render('./profile');
    } else {
        res.redirect('/');
    }
};