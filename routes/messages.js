const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

router.post('/send-message', messageController.send_message_post);

router.post('/delete-message', messageController.delete_message_post);

module.exports = router;