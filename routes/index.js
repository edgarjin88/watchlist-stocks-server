const express = require('express');
const uuidv4 = require('uuid/v4');
const { isLoggedIn, isNotLoggedIn } = require('./loginCheck');

const { User, Domain } = require('../models');

const router = express.Router();

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
  User.find({
    where: { id: req.user && req.user.id },  //뭔 개소리인가? id: 에다가 req.user와 req.user.id를 어사인 하란 말인가?
    //아니면 id:req.user를 먼저 하고, req.user.id가 true인 것을 찾으란 말인가?
    //여기서 id는 sql id. 
    //req.user(이건 세션)과 user.id와 같고, req.user.id가 존재할 때? 이말한 id안에 id가 다시 존재한다는 말인가?
    //passport가 더하는 user 인포인듯 그래도 문법이 여전히 이해가 안가긴 함. 
    //일단 console.log 해 보자. 
    // 일단 사용자 정보를 가져오고 1. 
    // 그다음 사용자가 등록한 도메인들을 include로 가져온다. 2

    include: { model: Domain },
  })
    .then((user) => {
      res.render('login', {
        user,
        loginError: req.flash('loginError'),
        domains: user && user.domains,
      });
    })
    .catch((error) => {
      next(error);
    });
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
