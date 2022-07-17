const Message = require ('../models/message');
const User = require ('../models/user');
const moment = require('moment');

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
    const date_formatted = moment(Date.now()).format('MMMM Do YYYY, h:mm a');
    const newMessage = new Message({
        title: req.body.title,
        text: req.body.text,
        date_formatted: date_formatted,
        timestamp: Date.now(),
        user: req.user._id
    }).save((err) => {
        if (err) return next(err);
        res.redirect('/');
    })
}

exports.delete_message_post = (req, res, next) => {
    Message.findByIdAndDelete(req.body.messageId, function deletedMessage(err) {
        if (err) return next(err);
        res.redirect('/');
    })

}