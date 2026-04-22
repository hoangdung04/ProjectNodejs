const ProductsCategory = require("../../models/products-category");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");
// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  };

  const productsCategory = await ProductsCategory.find(find);
  const newProductsCategory = createTreeHelper.tree(productsCategory);
  res.render("admin/pages/products-category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    productsCategory: newProductsCategory
  });
}
// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  const find = {
    deleted: false
  };
  const productsCategory = await ProductsCategory.find(find);
  const newProductsCategory = createTreeHelper.tree(productsCategory);
  res.render("admin/pages/products-category/create.pug", {
    pageTitle: "Thêm mới danh mục sản phẩm",
    productsCategory: newProductsCategory
  });
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const countProduct = await ProductsCategory.countDocuments();
    req.body.position = countProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const productsCategory = new ProductsCategory(req.body);
  await productsCategory.save();
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const find = {
      deleted: false
    };
    const productsCategory = await ProductsCategory.find(find);
    const newProductsCategory = createTreeHelper.tree(productsCategory);
    const product = await ProductsCategory.findOne({
      _id: id,
      deleted: false
    });
    res.render("admin/pages/products-category/edit.pug", {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      product: product,
      productsCategory: newProductsCategory
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
}

// [PATCH] /admin/products-category/edit/:id
module.exports.editPost = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position);
  await ProductsCategory.updateOne({
    _id: id
  }, req.body);
  req.flash('success', 'Cập nhật danh mục sản phẩm thành công');
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}