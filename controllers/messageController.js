const Message = require ('../models/message');
const User = require ('../models/user');

exports.messages_get = (req, res, next) => {
    Message.find()
        .sort([['timestamp', 'descending']])
        .populate("user")
        .exec((err, list_messages) => {
            if (err) return next(err);
            res.render('index', {
                title: "Members Only ",
                messages: list_messages,
                user: req.user
            });
        })
}

exports.send_message_post = (req, res, next) => {
    const newMessage = new Message({
        title: req.body.title,
        text: req.body.text,
        timestamp: Date.now(),
        user: req.user
    }).save((err) => {
        if (err) return next(err);
        res.redirect('/');
    })
}
