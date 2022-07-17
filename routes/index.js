const express = require('express');
const router = express.Router();
const messageRouter = require('../controllers/messageController');

router.get('/', messageRouter.messages_get);

module.exports = router;
