const mongoose = require('mongoose');
require('dotenv').config();

const checkDB = async () => {
    try {
        console.log('--- Bắt đầu kiểm tra Database ---');
        console.log('Connect URL:', process.env.MONGO_URL);

        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ Kết nối tới MongoDB thành công!');

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('--- Danh sách các Collections (Bảng) hiện có ---');
        
        if (collections.length === 0) {
            console.log('⚠️ Database trống! Không tìm thấy bảng nào.');
        } else {
            collections.forEach(col => console.log(`- ${col.name}`));
        }

        await mongoose.disconnect();
        console.log('--- Đã ngắt kết nối an toàn ---');
    } catch (error) {
        console.log('❌ Lỗi kết nối Database:', error.message);
    }
};

checkDB();
