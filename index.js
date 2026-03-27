const express = require('express'); 
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
require('dotenv').config();

// Config / Database
const database = require('./config/database');
const systemConfig = require('./config/system');

// Routes
const route = require('./routes/client/index.route');
const adminRoute = require('./routes/admin/index.route');

// Kết nối Database
database.connect();

const app = express();
const PORT = process.env.PORT;

// 1. Cấu hình View Engine (Pug)
app.set('views', './views');
app.set('view engine', 'pug');

// 2. Các biến toàn cục cho file Pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// 3. Thư mục file tĩnh (CSS, JS, Hình ảnh)
app.use(express.static('./public'));

// 4. Các Middleware cấu hình
// Cấu hình Method Override (Để dùng PATCH, DELETE...)
app.use(methodOverride('_method'));
// Cấu hình Body-Parser (Để đọc dữ liệu từ form gửi lên)
app.use(bodyParser.urlencoded({ extended: false }));

// Flash & Session
app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(flash());
// 5. Routes (Phải nằm SAU các middleware cấu hình ở trên)
route(app); 
adminRoute(app);

// 6. Lắng nghe server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});