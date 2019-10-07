const express = require('express');
const router = express.Router();

const middleware = require('../middleware');
const Post = require('../models/post');

router.get('/posts', (req, res) => {
  Post.find({}, (error, posts) => {
    if (error) {
      console.error(error);
    } else {
      res.render('posts/index', { posts });
    }
  });
});

router.get('/posts/new', middleware.isLoggedIn, (req, res) => res.render('posts/new'));

router.post('/posts', middleware.isLoggedIn, (req, res) => {
  Post.create(req.body.post, (error) => {
    if (error) {
      console.error(error);
    } else {
      res.redirect('/posts');
    }
  });
});

router.get('/posts/:id', (req, res) => {
  Post.findById(req.params.id, (error, post) => {
    if (error) {
      console.error(error);
    } else {
      res.render('posts/show', { post });
    }
  });
});

router.get('/posts/:id/edit', middleware.isLoggedIn, (req, res) => {
  Post.findById(req.params.id, (error, post) => {
    if (error) {
      console.error(error);
    } else {
      res.render('posts/edit', { post });
    }
  });
});

router.put('/posts/:id', middleware.isLoggedIn, (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body.post, { useFindAndModify: false }, error => {
    if (error) {
      console.error(error);
      res.redirect('/posts');
    } else {
      res.redirect(`/posts/${req.params.id}`);
    }
  });
});

router.delete('/posts/:id', middleware.isLoggedIn, (req, res) => {
  Post.findByIdAndRemove(req.params.id, { useFindAndModify: false }, error => {
    if (error) {
      console.error(error);
    }
    res.redirect('/posts');
  });
});

module.exports = router;
