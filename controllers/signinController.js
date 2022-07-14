const passport = require('passport');

exports.sign_in_get = (req, res, next) => {
    res.render('signin', {
        title: 'Sign In'
    })
}

exports.sign_out_get = (req, res , next) => {
    req.logout((err) => {
        if (err) return next(err);
    })
    res.redirect('/');
}

exports.sign_in_post = (
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/log-in'
    })
)

