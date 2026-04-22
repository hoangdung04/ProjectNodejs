const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/auth.controller');


router.get('/login', controller.login);
// [POST] /admin/auth/login
router.post('/login', controller.loginPost);


module.exports = router;