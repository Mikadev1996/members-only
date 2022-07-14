const passport = require('passport');

exports.sign_in_get = (req, res, next) => {
    res.render('signin', {
        title: 'Sign In'
    })
}

exports.sign_in_post = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/log-in'
    })
}
