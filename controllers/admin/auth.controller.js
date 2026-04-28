const md5 = require("md5");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
    const token = req.cookies.token;
    if (token) {
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    } else {
        res.render("admin/pages/auth/login.pug", {
            pageTitle: "Đăng nhập tài khoản",
        });
    }

}

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Account.findOne({
        email: email,
        deleted: false
    })



    if (!user) {
        req.flash("error", "Email không tồn tại");
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        return;
    }
    if (user.password != md5(password)) {
        req.flash("error", "Mật khẩu không chính xác");
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        return;
    }
    if (user.status !== "active") {
        req.flash("error", "Tài khoản đã bị khóa");
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        return;
    }
    res.cookie("token", user.token);
    req.flash("success", "Đăng nhập thành công");
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}
module.exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}