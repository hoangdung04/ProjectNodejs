const express = require('express');
const route = require('./routes/client/index.route');
const app = express();
const PORT = 3000;


app.set('views','./views');
app.set('view engine','pug');

route(app);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});