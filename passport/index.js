const local = require('./localStrategy');
const { User } = require('../models');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    console.log('serial fired');
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // console.log('this is ID in deserializeUer', id);
    User.find({ where: { id }}).then((user) => 
    {
      console.log('user info after deserializUser', user)
      return done(null, user)
    
    })
    .catch(err => done(err));                 // id = {id: id}

      
  });

  
  local(passport);
  // kakao(passport);
};
