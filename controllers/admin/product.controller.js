const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  console.log(req.query.status);
  const filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: false
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  // Tìm kiếm
  const objectSearch = searchHelper(req.query);

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // Phân trang
  const countProducts = await Product.countDocuments(find);
  let objectPagination = {
    currentPage: 1,
    limitItems: 4
  };
  objectPagination = paginationHelper(objectPagination, req.query, countProducts);
  // Sắp xếp
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "asc";
  }
  //end Sắp xếp
  const products = await Product.find(find).sort(sort).skip(objectPagination.skip).limit(objectPagination.limitItems);
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  });
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({
    _id: id
  }, {
    status: status
  });
  req.flash('success', 'Cập nhật trạng thái thành công');
  res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/products`);
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  console.log(req.body);
  const status = req.body.status;
  const ids = req.body.ids.split(",");

  switch (status) {
    case "active":
      await Product.updateMany({
        _id: {
          $in: ids
        }
      }, {
        status: "active"
      });
      req.flash('success', `Cập nhật trạng thái của ${ids.length} sản phẩm thành công`);
      break;
    case "notWorking":
      await Product.updateMany({
        _id: {
          $in: ids
        }
      }, {
        status: "notWorking"
      });
      req.flash('success', `Cập nhật trạng thái của ${ids.length} sản phẩm thành công`);
      break;
    case "deleted-all":
      await Product.updateMany({
        _id: {
          $in: ids
        }
      }, {
        deleted: true,
        deletedAt: new Date()
      });
      req.flash('success', `Xóa ${ids.length} sản phẩm thành công`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({
          _id: id
        }, {
          position: position
        });
      }
      req.flash('success', `Thay đổi vị trí của ${ids.length} sản phẩm thành công`);
      break;
  }
  res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/products`);
}

// [DELETE] /admin/products/delete-item/:id
module.exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  // await Product.deleteOne({_id: id});
  await Product.updateOne({
    _id: id
  }, {
    deleted: true,
    deletedAt: new Date()
  });
  req.flash('success', `Xóa sản phẩm thành công`);
  res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/products`);
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render(`admin/pages/products/create`, {
    pageTitle: "Thêm mới sản phẩm",
  });
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {

  console.log(req.file);
  req.body.price = parseInt(req.body.price) || 0;
  req.body.stock = parseInt(req.body.stock) || 0;
  req.body.discountPercentage = parseInt(req.body.discountPercentage) || 0;

  if (req.body.position == "") {
    const countProduct = await Product.countDocuments();
    req.body.position = countProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  await Product.create(req.body);
  req.flash('success', 'Thêm mới sản phẩm thành công');
  res.redirect(`${req.app.locals.prefixAdmin}/products`);
}
// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    }
    const product = await Product.findOne(find);

    res.render(`admin/pages/products/edit`, {
      pageTitle: "Sửa sản phẩm",
      product: product
    });
  } catch (error) {
    req.flash('error', 'Không tìm thấy sản phẩm');
    res.redirect(`${req.app.locals.prefixAdmin}/products`);
  }

}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price) || 0;
  req.body.stock = parseInt(req.body.stock) || 0;
  req.body.discountPercentage = parseInt(req.body.discountPercentage) || 0;

  req.body.position = parseInt(req.body.position);
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  await Product.updateOne({
    _id: id
  }, req.body);
  req.flash('success', 'Cập nhật sản phẩm thành công');
  res.redirect(`${req.app.locals.prefixAdmin}/products`);
}
// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    }
    const product = await Product.findOne(find);

    res.render(`admin/pages/products/detail`, {
      pageTitle: product.title,
      product: product
    });
  } catch (error) {
    req.flash('error', 'Không tìm thấy sản phẩm');
    res.redirect(`${req.app.locals.prefixAdmin}/products`);
  }

}