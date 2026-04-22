const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/role.controller');


router.get('/', controller.index);
// [GET] /admin/roles/create
router.get('/create', controller.create);
// [POST] /admin/roles/create
router.post('/create', controller.createPost);
// [GET] /admin/roles/edit/:id
router.get('/edit/:id', controller.edit);
// [PATCH] /admin/roles/edit/:id
router.patch('/edit/:id', controller.editPatch);
// [GET] /admin/roles/permissions
router.get('/permissions', controller.permissions);
// [PATCH] /admin/roles/permissions
router.patch('/permissions', controller.permissionsPatch);


module.exports = router;