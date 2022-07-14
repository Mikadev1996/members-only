const express = require('express');
const router = express.Router();

const memberController = require('../controllers/memberController');

router.get('/apply-member', memberController.apply_member_get);

router.post('/apply-member', memberController.apply_member_post);

router.get('/apply-admin', memberController.apply_admin_get);

router.post('/apply-admin', memberController.apply_admin_post);

module.exports = router;