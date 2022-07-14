const express = require('express');
const router = express.Router();
const signinController = require('../controllers/signinController');

router.get('/', signinController.sign_out_get);

module.exports = router;