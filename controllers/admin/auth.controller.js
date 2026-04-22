const Account = require("../../models/account.model");
// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
    res.render("admin/pages/auth/login.pug", {
        pageTitle: "Đăng nhập tài khoản",
    });
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
        res.redirect("back");
        return;
    }
    if (user.password != password) {
        req.flash("error", "Mật khẩu không chính xác");
        res.redirect("back");
        return;
    }
    res.redirect("/");
}