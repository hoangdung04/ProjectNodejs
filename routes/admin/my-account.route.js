const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/my-account.controller');
const multer = require('multer');
const uploadCloud = require('../../middleware/admin/uploadCloud.middleware');
const upload = multer();



router.get('/', controller.index);

router.get('/edit', controller.edit);


router.patch(
    '/edit',
    upload.single('avatar'),
    uploadCloud.upload,
    controller.path
);



module.exports = router;