const ProductsCategory = require("../../models/products-category");
const systemConfig = require("../../config/system");
// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  };
  const productsCategory = await ProductsCategory.find(find);
  res.render("admin/pages/products-category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    productsCategory: productsCategory
  });
}
// [GET] /admin/products-category/create
module.exports.create = (req, res) => {
  res.render("admin/pages/products-category/create.pug", {
    pageTitle: "Thêm mới danh mục sản phẩm"
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