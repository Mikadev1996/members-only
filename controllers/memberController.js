const User = require('../models/user');
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const Password = require('../models/passwords');

exports.apply_member_get = (req, res, next) => {
    res.render('apply_member', {
        title: "Apply Member",
    })
}

exports.apply_member_post = [
    body('password', 'Password must not be empty.').trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        Password.findOne({role: "member"}, (err, role) => {
            if (err) return next(err);

            if (role.password === req.body.password) {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    console.log(errors);
                    return;
                }
                const newUser = new User({
                    name: req.user.username,
                    password: req.user.password,
                    date_joined: req.user.date_joined,
                    isMember: true,
                    isAdmin: req.user.isAdmin,
                    _id: req.user._id,
                })

                User.findByIdAndUpdate(req.user._id, newUser, {}, function(err, theUser) {
                    if (err) return next(err);
                    res.redirect('/');
                })
            }

            else {
                res.redirect('/');
            }

            // bcrypt.compare(role.password, req.body.password, (err, result) => {
            //     if (err) return next(err);
            //     console.log(req.body.password);
            //     console.log(role.password)
            //     console.log(result);
            //     if (result) {
            //        // change member status
            //     }
            //     else {
            //         res.redirect('/');
            //     }
            // })
        })
    }
]


exports.apply_admin_get = (req, res, next) => {
    res.render('apply_admin', {
        title: "Apply Admin",
    })
}
exports.apply_admin_post = [
    body('password', 'Password must not be empty.').trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        Password.findOne({role: "admin"}, (err, role) => {
            if (err) return next(err);

            bcrypt.compare(role.password, req.body.password, (err, result) => {
                if (err) return next(err);
                if (result) {
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                        console.log(errors);
                        return;
                    }
                    const newUser = new User({
                        name: req.user.username,
                        password: req.user.password,
                        date_joined: req.user.date_joined,
                        isMember: req.user.isMember,
                        isAdmin: true,
                        _id: req.user._id,
                    })

                    User.findByIdAndUpdate(req.user._id, newUser, {}, function(err, theUser) {
                        if (err) return next(err);
                        res.redirect('/');
                    })
                }
            })
        })
    }
]
