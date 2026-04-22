const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
    permissions: {
        type: Array,
        default: []
    },
}, {
    timestamps: true
});


const Role = mongoose.model('Role', roleSchema, "roles");

module.exports = Role;