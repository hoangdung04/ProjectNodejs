const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");
module.exports.index = async (req, res) => {
  const productsFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active"
  })
  const newProductsFeatured = productsHelper(productsFeatured);
  //hiển thị sản phẩm mới nhất
  const productsNew = await Product.find({
    deleted: false,
    status: "active"
  }).sort({
    position: "desc"
  }).limit(4);

  const newProductsNew = productsHelper(newProductsFeatured);

  res.render("client/pages/home/index.pug", {
    pageTitle: "Trang chủ",
    productsFeatured: productsNew,
    productsNew: newProductsNew
  });
}