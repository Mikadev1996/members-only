const express = require('express');
const router = express.Router();
const Message = require('../models/message');

router.get('/', (req, res, next) => {
  Message.find()
      .sort([['timestamp', 'descending']])
      .exec((err, list_messages) => {
        if (err) return next(err);
        res.render('index', {
          title: "Members Only ",
          messages: list_messages,
          user: req.user
        });
      })

})
module.exports = router;
