const Role = require('../../models/role.model');
const systemConfig = require('../../config/system');
// [GET] /admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };
    const roles = await Role.find(find);
    res.render("admin/pages/roles/index.pug", {
        pageTitle: "Danh sách vai trò",
        roles: roles
    });
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create.pug", {
        pageTitle: "Thêm mới vai trò"
    });
}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);
    record.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await Role.findOne({
            _id: id,
            deleted: false
        });
        res.render("admin/pages/roles/edit.pug", {
            pageTitle: "Sửa vai trò",
            role: role
        });
    } catch (error) {
        req.flash('error', 'Không tìm thấy vai trò');
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;
        await Role.updateOne({
            _id: id
        }, req.body);
        req.flash('success', 'Cập nhật vai trò thành công');
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    } catch (error) {
        req.flash('error', 'Không tìm thấy vai trò');
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
}
// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await Role.find(find);
    res.render("admin/pages/roles/permissions.pug", {
        pageTitle: "Phân quyền",
        records: records
    });
}
// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
    try {
        const permissions = JSON.parse(req.body.permissions);
        for (const item of permissions) {
            await Role.updateOne({
                _id: item.roleId
            }, {
                permissions: item.permissions
            });
        }
        req.flash('success', 'Cập nhật phân quyền thành công');
        res.redirect(`${systemConfig.prefixAdmin}/roles/permissions`);
    } catch (error) {
        req.flash('error', 'Không tìm thấy vai trò');
        res.redirect(`${systemConfig.prefixAdmin}/roles/permissions`);
    }

}