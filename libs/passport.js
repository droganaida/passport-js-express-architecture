
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const Config = require('./config');

module.exports = passport => {

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj.id);
    });

    //============ GOOGLE
    passport.use('google', new GoogleStrategy({
            clientID: Config.oauth.googleAuth.clientID,
            clientSecret: Config.oauth.googleAuth.clientSecret,
            callbackURL: Config.oauth.googleAuth.callbackURL
        },
        function(request, accessToken, refreshToken, profile, done) {
            process.nextTick(() => {
                done(null, profile);
            });
        }));

    //============ FACEBOOK
    passport.use('facebook', new FacebookStrategy({
            clientID: Config.oauth.facebookAuth.clientID,
            clientSecret: Config.oauth.facebookAuth.clientSecret,
            callbackURL: Config.oauth.facebookAuth.callbackURL,
            profileFields: ['id', 'displayName', 'name', 'gender', "emails", 'photos']
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(() => {
                done(null, profile);
            });
        }));

    //============ VK
    passport.use('vkontakte', new VKontakteStrategy({
            clientID: Config.oauth.vkontakteAuth.clientID,
            clientSecret: Config.oauth.vkontakteAuth.clientSecret,
            callbackURL: Config.oauth.vkontakteAuth.callbackURL
        },
        function(accessToken, refreshToken, params, profile, done) {
            const _profile = JSON.parse(JSON.stringify(profile));
            _profile.emails = [{value: params.email}];
            process.nextTick(() => {
                done(null, _profile);
            });
        }));
};

