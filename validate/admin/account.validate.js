const Account = require('../../models/account.model');

module.exports.createPost = async (req, res, next) => {

    if (!req.body.fullName) {
        req.flash('error', 'Vui lòng nhập họ tên');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts`);
        return;
    }

    if (req.body.fullName.length < 5) {
        req.flash('error', 'Họ tên phải có ít nhất 5 ký tự');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts`);
        return;
    }

    if (!req.body.email) {
        req.flash('error', 'Vui lòng nhập email');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts`);
        return;
    }

    if (req.body.email.length < 5) {
        req.flash('error', 'Email phải có ít nhất 5 ký tự');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts`);
        return;
    }

    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    });

    if (emailExist) {
        req.flash('error', `Email ${req.body.email} đã tồn tại`);
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts`);
        return;
    }

    if (!req.body.password) {
        req.flash('error', 'Vui lòng nhập mật khẩu');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts`);
        return;
    }

    if (req.body.password.length < 5) {
        req.flash('error', 'Mật khẩu phải có ít nhất 5 ký tự');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts`);
        return;
    }

    if (!req.body.phone) {
        req.flash('error', 'Vui lòng nhập số điện thoại');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts`);
        return;
    }

    if (req.body.phone.length < 5) {
        req.flash('error', 'Số điện thoại phải có ít nhất 5 ký tự');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts`);
        return;
    }

    if (!req.body.role_id) {
        req.flash('error', 'Vui lòng chọn phân quyền');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts`);
        return;
    }

    if (!req.body.status) {
        req.flash('error', 'Vui lòng chọn trạng thái');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts`);
        return;
    }
    next();
}

module.exports.editPatch = async (req, res, next) => {
    if (!req.body.fullName) {
        req.flash('error', 'Vui lòng nhập họ tên');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts/edit/${req.params.id}`);
        return;
    }

    if (req.body.fullName.length < 5) {
        req.flash('error', 'Họ tên phải có ít nhất 5 ký tự');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts/edit/${req.params.id}`);
        return;
    }

    if (!req.body.email) {
        req.flash('error', 'Vui lòng nhập email');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts/edit/${req.params.id}`);
        return;
    }

    if (req.body.email.length < 5) {
        req.flash('error', 'Email phải có ít nhất 5 ký tự');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts/edit/${req.params.id}`);
        return;
    }

    if (!req.body.phone) {
        req.flash('error', 'Vui lòng nhập số điện thoại');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts/edit/${req.params.id}`);
        return;
    }

    if (req.body.phone.length < 5) {
        req.flash('error', 'Số điện thoại phải có ít nhất 5 ký tự');
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts/edit/${req.params.id}`);
        return;
    }
    const emailExist = await Account.findOne({
        _id: {
            $ne: req.params.id
        },
        email: req.body.email,
        deleted: false
    });

    if (emailExist) {
        req.flash('error', `Email ${req.body.email} đã tồn tại`);
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts/edit/${req.params.id}`);
        return;
    }

    next();
}