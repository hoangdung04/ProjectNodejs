const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    categoryParentId: {
        type: String,
        default: ""
    },
    stock: Number,
    discountPercentage: Number,
    description: String,
    thumbnail: String,
    position: Number,
    featured: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        account_id: String,
        createdAt: {
            type: String,
            default: Date.now()
        }
    },
    deletedBy: {
        account_id: String,
        deletedAt: Date
    },
    updateBy: [{
        account_id: String,
        updateAt: Date
    }],
    position: Number,
    slug: {
        type: String,
        slug: "title",
        unique: true
    }
}, {
    timestamps: true
});


const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product;