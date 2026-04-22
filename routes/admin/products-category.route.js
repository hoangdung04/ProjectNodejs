const express = require('express');
const productCategoryRouter = express.Router();
const productsCategoryController = require('../../controllers/admin/products-category.controller');
const multer = require('multer')
const upload = multer()
const validate = require('../../validate/admin/product.validate');
const uploadCloude = require('../../middleware/admin/uploadCloud.middleware');



// [GET] /admin/products-category
productCategoryRouter.get('/', productsCategoryController.index);

// [GET] /admin/products-category/create
productCategoryRouter.get('/create', productsCategoryController.create);

// [POST] /admin/products-category/create
productCategoryRouter.post('/create', upload.single('thumbnail'), uploadCloude.upload, validate.createPost, productsCategoryController.createPost);

// [GET] /admin/products-category/edit/:id
productCategoryRouter.get('/edit/:id', productsCategoryController.edit);

// [PATCH] /admin/products-category/edit/:id
productCategoryRouter.patch('/edit/:id', upload.single('thumbnail'), uploadCloude.upload, validate.createPost, productsCategoryController.editPost);
module.exports = productCategoryRouter;