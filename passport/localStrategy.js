const LocalStrategy = require('passport-local').Strategy;
 // why do I requrie only here? what about app.js ?? 
 
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const exUser = await User.find({ where: { email } });
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: 'Password does not match' });
        }
      } else {
        done(null, false, { message: 'Your have not signed up yet.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
