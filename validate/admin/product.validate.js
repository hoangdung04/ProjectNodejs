module.exports.createPost = async (req, res, next) => {

  if(!req.body.title){
    req.flash('error', 'Vui lòng nhập tên sản phẩm');
    res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/products`);
    return;
  }

  if(req.body.title.length < 5){
    req.flash('error', 'Tiêu đề sản phẩm phải có ít nhất 5 ký tự');
    res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/products`);
    return;
  } 
  next();
}   