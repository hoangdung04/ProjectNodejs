const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/auth.controller');
const validate = require('../../validate/admin/auth.validate');

router.get('/login', controller.login);
// [POST] /admin/auth/login
router.post('/login', validate.loginPost, controller.loginPost);
// [GET] /admin/auth/logout
router.get('/logout', controller.logout);


module.exports = router;