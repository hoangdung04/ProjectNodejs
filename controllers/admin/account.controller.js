const md5 = require('md5');
const Account = require('../../models/account.model');
const Role = require('../../models/role.model');

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };

    const records = await Account.find(find).select("-password -token");
    for (const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        });
        record.role = role;
    }


    res.render("admin/pages/accounts/index.pug", {
        pageTitle: "Danh sách tài khoản",
        records: records
    });
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false
    });

    res.render("admin/pages/accounts/create.pug", {
        pageTitle: "Thêm mới tài khoản",
        roles: roles
    });
}

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
    req.body.password = md5(req.body.password);
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    });

    if (emailExist) {
        req.flash('error', `Email ${req.body.email} đã tồn tại`);
        res.redirect(req.get('Referer') || `${req.app.locals.prefixAdmin}/accounts`);
        return;
    }
    const record = new Account(req.body);
    await record.save();

    req.flash('success', 'Tạo tài khoản thành công');
    res.redirect(`${req.app.locals.prefixAdmin}/accounts`);
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    const find = {
        _id: req.params.id,
        deleted: false
    };

    const record = await Account.findOne(find).select("-password -token");
    const roles = await Role.find({
        deleted: false
    });

    res.render("admin/pages/accounts/edit.pug", {
        pageTitle: "Chỉnh sửa tài khoản",
        record: record,
        roles: roles
    });
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
    if (req.body.password) {
        req.body.password = md5(req.body.password);
    } else {
        delete req.body.password;
    }
    await Account.updateOne({
        _id: req.params.id
    }, req.body);
    req.flash('success', 'Cập nhật tài khoản thành công');
    res.redirect(`${req.app.locals.prefixAdmin}/accounts`);
}