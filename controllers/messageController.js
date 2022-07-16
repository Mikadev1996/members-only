const Message = require ('../models/message');

exports.send_message_post = (req, res, next) => {
    const newMessage = new Message({
        title: req.body.title,
        text: req.body.text,
        timestamp: Date.now(),
        user: req.user._id
    }).save((err) => {
        if (err) return next(err);
        res.redirect('/');
    })
}
