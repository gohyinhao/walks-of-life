const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res) => res.render('home'));

// router.post('/register', (req, res) => {
//   const newUser = new User({ username: req.body.username });
//   User.register(newUser, req.body.password, (error, user) => {
//     if (error) {
//       console.error(error);
//     } else {
//       res.send('User created successfully');
//     }
//   });
// });

router.get('/about', (req, res) => res.render('about'));

router.get('/login', (req, res) => res.render('login'));

router.post('/login', passport.authenticate('local', {
  successRedirect: '/posts',
  successFlash: 'Welcome! You have successfully logged in!',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Successfully logged out!');
  res.redirect('/');
})

module.exports = router;
