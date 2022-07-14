const User = require ('../models/user');

exports.sign_up_get = (req, res, next) => {
    res.render('signup', {
        title: 'Sign Up',
    })
}

exports.sign_up_post = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
        if (err) return next(err);

        const user = new User({
            username: req.body.username,
            password: hashedPass,
        }).save((err) => {
            if (err) return next(err);
            res.redirect('/');
        })
    })
}