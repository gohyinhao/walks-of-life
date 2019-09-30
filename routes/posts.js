const express = require('express');
const router = express.Router();

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

router.get('/posts/new', (req, res) => res.render('posts/new'));

router.post('/posts', (req, res) => {
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

router.get('/posts/:id/edit', (req, res) => {
  Post.findById(req.params.id, (error, post) => {
    if (error) {
      console.error(error);
    } else {
      res.render('posts/edit', { post });
    }
  });
});

router.put('/posts/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body.post, { useFindAndModify: false }, error => {
    if (error) {
      console.error(error);
      res.redirect('/posts');
    } else {
      res.redirect(`/posts/${req.params.id}`);
    }
  });
});

module.exports = router;
