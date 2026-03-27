const express = require('express');
const multer  = require('multer')
const storageMulter = require('../../helpers/storageMulter');
const upload = multer({ storage: storageMulter() })
const productRouter = express.Router();
const productController = require('../../controllers/admin/product.controller');
const validate = require('../../validate/admin/product.validate');

// [GET] /admin/products
productRouter.get('/', productController.index);

// [PATCH] /admin/products/change-status/:status/:id
productRouter.patch('/change-status/:status/:id', productController.changeStatus);

// [PATCH] /admin/products/change-multi
productRouter.patch('/change-multi', productController.changeMulti);

// [DELETE] /admin/products/delete/:id
productRouter.delete('/delete-item/:id', productController.deleteProduct);
// [GET] /admin/products/create
productRouter.get('/create', productController.create);
// [POST] /admin/products/create
productRouter.post('/create', upload.single('thumbnail'), validate.createPost, productController.createPost);

// [GET] /admin/products/edit/:id
productRouter.get('/edit/:id', productController.edit);

// [PATCH] /admin/products/edit/:id
productRouter.patch('/edit/:id', upload.single('thumbnail'), validate.createPost, productController.editPatch);

// [GET] /admin/products/detail/:id
productRouter.get('/detail/:id', productController.detail);

module.exports = productRouter;
