
exports.get = async (req, res, next) => {
    res.locals.title = 'Welcome to Passport demo by #BlondieCode';
    res.render('./main');
};