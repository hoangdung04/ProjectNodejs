const Product = require("../../models/product.model");

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
      status: "active",
      deleted: false
    }).sort({position: "asc"});
   const newProducts = products.map(item => {
      item.priceNew = (item.price * (1 - item.discountPercentage / 100)).toFixed(2);
      return item;
    });
    res.render("client/pages/products/index.pug",{
      pageTitle: "Trang sản phẩm",
      products: newProducts
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