module.exports.createPost = async (req, res, next) => {

    if (!req.body.title) {
        req.flash('error', 'Vui lòng nhập tên danh mục');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/products-category`);
        return;
    }

    if (req.body.title.length < 5) {
        req.flash('error', 'Tiêu đề danh mục phải có ít nhất 5 ký tự');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/products-category`);
        return;
    }
    next();
}