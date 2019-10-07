const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res) => res.render('home'));

router.post('/register', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (error, user) => {
    if (error) {
      console.error(error);
    }
  });
});

router.get('/login', (req, res) => res.render('login'));

router.post('/login', passport.authenticate('local', {
  successRedirect: '/posts',
  failureRedirect: '/login',
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/posts');
})

module.exports = router;
