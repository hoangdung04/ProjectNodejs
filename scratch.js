const mongoose = require('mongoose');
const Product = require('./models/product.model');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL).then(async () => {
    const products = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    });
    console.log("Found products:", products);
    const allFeatured = await Product.find({ featured: "1" });
    console.log("All featured=1:", allFeatured.length);
    mongoose.disconnect();
}).catch(console.error);
