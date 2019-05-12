const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');

const router = express.Router();

//profile page
router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: 'Your info', user: req.user }); // user는 어디서 오는가?
  console.log('this is user:', req.user);
});

//sign up page
router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: 'Sign Up Page',
    user: req.user,
    joinError: req.flash('joinError'),
  });
});

//main page
router.get('/', (req, res, next) => {
  Post.findAll({
    include: {
      model: User,
      attributes: ['id', 'nick'],
    },
    order: [['createdAt', 'DESC']],
  })
    .then((posts) => {
      res.render('main', {
        title: 'NodeBird',
        twits: posts,
        user: req.user,
        loginError: req.flash('loginError'),
      });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

module.exports = router;
