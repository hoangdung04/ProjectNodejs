const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
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
},{timestamps: true});

productSchema.plugin(slug);
   

const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product;