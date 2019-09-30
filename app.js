const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

// Local Host
mongoose.connect('mongodb://localhost:27017/walksOfLifeDB', { useNewUrlParser: true })
// Atlas Database
// mongoose.connect('mongodb+srv://admin:vsyZJDRePzK5FGuS@maindb-p4sqm.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('DB Connected!'))
  .catch(error => console.log('DATABASE ERROR:', error.message));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// =================================
// ROUTES
// =================================
const indexRoutes = require('./routes/index');
const postRoutes = require('./routes/posts');
app.use(indexRoutes);
app.use(postRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Walks Of Life Server has started.'));
