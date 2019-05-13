const jwt = require('jsonwebtoken')

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('You need to log in');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) { //passport would add this into 'req' object
    next();
  } else {
    res.redirect('/');
  }
};

exports.verifyToken =(req, res, next) =>{
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    return next() // return required? 

  }catch(error){
    if(error.name ==='TokenExpiredError'){ //when expired

      return res.status(419).json({
        code:419, 
        message: 'Token expired'
      }); 

    }
    return res.status(401).json({
      code: 401, 
      message: "Invalid token"
    })

  }
}