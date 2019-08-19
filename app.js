const express = require('express');
const app = express();

app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');

// =================================
// ROUTES
// =================================
const indexRoutes = require('./routes/index');
app.use(indexRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => 'Walks Of Life Server has started.');
