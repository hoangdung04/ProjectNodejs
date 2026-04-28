const Account = require('../../models/account.model');

module.exports.loginPost = async (req, res, next) => {

    if (!req.body.email) {
        req.flash('error', 'Vui lòng nhập email1');
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
    next();
}