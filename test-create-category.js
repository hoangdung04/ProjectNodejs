require('dotenv').config();
const mongoose = require('mongoose');
const ProductsCategory = require('./models/products-category');

async function test() {
  await mongoose.connect(process.env.MONGO_URL);
  try {
    const category = new ProductsCategory({ title: "Test Category " + Date.now(), status: "active" });
    await category.save();
    console.log("Successfully created category!");
  } catch (error) {
    console.error("Error creating category:", error);
  }
  process.exit();
}
test();
