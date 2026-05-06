const Product = require("../../models/product.model");
const ProductCategory = require("../../models/products-category.js");
const productsHelper = require("../../helpers/products");
const getSubCategoryHelper = require("../../helpers/product-category");



// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false
  }).sort({
    position: "asc"
  });
  const newProducts = productsHelper(products);
  res.render("client/pages/products/index.pug", {
    pageTitle: "Trang sản phẩm",
    products: newProducts,

  });
}

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slug
    }
    const product = await Product.findOne(find);

    res.render(`client/pages/products/detail`, {
      pageTitle: product.title,
      product: product,
      status: "active",
      deleted: false
    });
  } catch (error) {
    req.flash('error', 'Không tìm thấy sản phẩm');
    res.redirect(`/products`);
  }

}


module.exports.category = async (req, res) => {
  try {
    const category = await ProductCategory.findOne({
      slug: req.params.slugCategory,
      deleted: false,
      status: "active"
    });



    const listSubCategory = await getSubCategoryHelper.getSubCategory(category.id);
    const listSubCategoryId = listSubCategory.map(item => item.id);

    const products = await Product.find({
      categoryParentId: {
        $in: [category.id, ...listSubCategoryId]
      },
      deleted: false,
      status: "active"
    }).sort({
      position: "desc"
    });

    const newProducts = productsHelper(products);

    res.render("client/pages/products/index.pug", {
      pageTitle: category.title,
      products: newProducts,
    });
  } catch (error) {
    res.redirect("/products");
  }
}