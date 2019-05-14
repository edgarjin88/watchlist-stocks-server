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

      console.log('login success!', user);


      return res.redirect('/');  //why return? 
    });
  })(req, res, next); 

});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');


});


module.exports = router;
