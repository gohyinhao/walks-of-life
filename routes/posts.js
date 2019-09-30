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
  const title = req.body.title;
  const content = req.body.content;
  const newPost = { title, content };
  Post.create(newPost, (error) => {
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

module.exports = router;
