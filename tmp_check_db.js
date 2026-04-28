const mongoose = require('mongoose');
require('dotenv').config();

const checkDB = async () => {
    try {
        console.log('--- Bắt đầu kiểm tra Database ---');
        console.log('Connect URL:', process.env.MONGO_URL);

        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ Kết nối tới MongoDB thành công!');

        const Account = require('./models/account.model');
        const user = await Account.findOne({ email: 'hoangdung6222@gmail.com', deleted: false });
        console.log('User found:', user);

        await mongoose.disconnect();
        console.log('--- Đã ngắt kết nối an toàn ---');
    } catch (error) {
        console.log('❌ Lỗi kết nối Database:', error.message);
    }
};

checkDB();
