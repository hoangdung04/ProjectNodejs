const Account = require('../../models/account.model');
const md5 = require('md5');
module.exports.index = async (req, res) => {
    res.render("admin/pages/my-account/index.pug", {
        pageTitle: "Tài khoản của tôi"
    });
}
module.exports.edit = async (req, res) => {
    res.render("admin/pages/my-account/edit.pug", {
        pageTitle: "Chỉnh sửa tài khoản"
    });
}

module.exports.path = async (req, res) => {
    const emailExist = await Account.findOne({
        _id: {
            $ne: res.locals.user.id
        },
        email: req.body.email,
        deleted: false
    });
    if (emailExist) {
        req.flash('error', `Email ${req.body.email} đã tồn tại`);
        res.redirect(`${req.app.locals.prefixAdmin}/my-account/edit`);
        return;
    }

    if (req.body.password) {
        req.body.password = md5(req.body.password);
    } else {
        delete req.body.password;
    }
    await Account.updateOne({
        _id: res.locals.user.id
    }, req.body);
    req.flash('success', 'Cập nhật tài khoản thành công');
    res.redirect(`${req.app.locals.prefixAdmin}/my-account`);
}