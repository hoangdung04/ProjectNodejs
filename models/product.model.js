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
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
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