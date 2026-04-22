const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/account.controller');
const multer = require('multer');
const upload = multer();
const uploadCloude = require('../../middleware/admin/uploadCloud.middleware')
const validate = require('../../validate/admin/account.validate');


router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', upload.single('avatar'), uploadCloude.upload, validate.createPost, controller.createPost);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id', upload.single('avatar'), uploadCloude.upload, validate.editPatch, controller.editPatch);

module.exports = router;