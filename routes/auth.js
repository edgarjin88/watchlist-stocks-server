const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./loginCheck');
const { User } = require('../models');

const router = express.Router();
// this router deal with login, join


router.post('/join', isNotLoggedIn, async (req, res, next) => { //async here!
  //middlewares going through as call backs. Number of middleware does not matter. 
  const { name, userId, password } = req.body;
  try {
    const exUser = await User.find({ where: { userId } }); //where does this 'find' function come?
    if (exUser) {
      req.flash('joinError', 'Your email is already taken.');
      return res.redirect('/join');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      name,
      userId,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    //passport would add '.authenticate. go and check passport
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash('loginError', info.message);
      
      return res.redirect('/');
    }
    return req.login(user, (loginError) => { 
   
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
    //make the token here then.
      console.log('!!!!!!!!!!!!!!!!!!login success!');
      
      // console.log('!!!!!!!!!!req.user.id!', req.user.id);
      // console.log('!!!!!!!!!!req.session.id!', req.session);
      // console.log('!!!!!!!!!!req.session.passport!', req.session.passport);
      // console.log('!!!!!!!!!!req.session.passport.user!', req.session.passport.user);

      // console.log('You are logged on successfully',req.user.id, req.session );
      // console.log('You are logged on successfully',req.user.id, req.session );
      // console.log('this is cookei', req.cookie)
      // console.log('this is session Cookie', req.session.cookie)
      return res.json(req.session);  //why return? 
    });
  })(req, res, next); 

});

router.get('/logout', isLoggedIn, (req, res) => {
  console.log('logout fired');
  req.logout();
  req.session.destroy();
  res.redirect('/');


});


module.exports = router;
