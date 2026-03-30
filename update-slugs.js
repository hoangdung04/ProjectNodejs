const mongoose = require('mongoose');
require('dotenv').config();

// Hàm tạo slug thủ công để đảm bảo 100% có kết quả
function convertToSlug(text) {
    const slug = text.toString().toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/([^0-9a-z-\s])/g, '')
        .replace(/(\s+)/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
    return slug;
}

const Product = require('./models/product.model');

async function updateSlugs() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Kết nối database thành công!");

        const products = await Product.find({});
        console.log(`Tìm thấy ${products.length} sản phẩm.`);

        for (const product of products) {
            if (product.title) {
                const slugValue = convertToSlug(product.title);
                // Gán trực tiếp vào trường slug
                product.slug = slugValue;
                await product.save();
                console.log(`-> Cập nhật: ${product.title} => ${product.slug}`);
            }
        }

        console.log("------------------------------------------");
        console.log("Cập nhật hoàn tất! Refresh lại MongoDB Compass là thấy ngay.");
        process.exit();
    } catch (error) {
        console.error("Lỗi cập nhật:", error);
        process.exit(1);
    }
}

updateSlugs();
