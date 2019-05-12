const express = require('express');

const { isLoggedIn } = require('./loginCheck');
const { User } = require('../models');

const router = express.Router();


// router.post('/:id/follow', isLoggedIn, async (req, res, next) => { //follow를 클릭하면, 
//   try {
//     const user = await User.find({ where: { id: req.user.id } }); //user 찾아서
//     await user.addFollowing(parseInt(req.params.id, 10)); // following
//     //나중에 수정할 것. 
//     res.send('success');
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

module.exports = router;
