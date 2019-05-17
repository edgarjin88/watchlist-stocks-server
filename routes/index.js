const express = require('express');
const uuidv4 = require('uuid/v4');
// const cors =require('cors')
const { isLoggedIn, isNotLoggedIn } = require('./loginCheck');

const { User, Domain } = require('../models');

const router = express.Router();
// router.use(cors())


router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: 'Your info', user: req.user }); // user는 어디서 오는가?
  //이건 그냥 req 되서 오는 거다. 
  console.log('this is user:', req.user);
});

// for sign up
router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: 'Sign Up Page',
    user: req.user,
    joinError: req.flash('joinError'),
  });
});


router.get('/', (req, res, next) => {
  
    res.json({"nostocklist": "googl,aapl,msft,fb,dis,amzn,baba,jnj,brk.a,jpm"})
 
  

 });

router.post('/domain', (req, res, next) => {
  Domain.create({
    userId: req.user.id,
    host: req.body.host, //for host finding
    type: req.body.type,
    clientSecret: uuidv4(), //for api access
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
