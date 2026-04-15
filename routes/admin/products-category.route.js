const express = require('express');
const productCategoryRouter = express.Router();

const productsCategoryController = require('../../controllers/admin/products-category.controller');


// [GET] /admin/products-category
productCategoryRouter.get('/', productsCategoryController.index);

// [GET] /admin/products-category/create
productCategoryRouter.get('/create', productsCategoryController.create);


module.exports = productCategoryRouter;
