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
module.exports = productCategoryRouter;