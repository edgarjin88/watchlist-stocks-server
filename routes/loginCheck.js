const jwt = require('jsonwebtoken')

exports.isLoggedIn = (req, res, next) => {
  // console.log('is loggedin fired, and req:', req)
  /// original code//
//   if (req.isAuthenticated()) {
//     console.log('!!!! in this case, authenticated(): reeq', req);
//     next();
// ///
  if(req.session.passport.user !== undefined){
    console.log('custom passport session fired, and req.session', req.session);
    next()
  } else {
    console.log('failed this is request req.session:', req.session);
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
    if(error.name ==='TokenExpiredError'){ 

      return res.status(419).json({
        code:419, 
        message: 'Token expired'//when expired. how to set
      }); 

    }
    return res.status(401).json({
      code: 401, 
      message: "Invalid token"
    })

  }
}
//토큰의 내용은 v1.js 에서 설정한다.