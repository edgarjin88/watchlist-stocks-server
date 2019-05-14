const express = require('express');
const jwt = require('jsonwebtoken')
const cors = require('cors'); 

const {verifyToken} = require('./loginCheck');
const {Stock, User, Favoritelist, Domain } = require('../models')

const router = express.Router();  // router 에다가 cors 적용뙴 . 
// router.use(cors()); 

// router.use(deprecated) // what is this ?

router.post('/token', async (req, res) => { //이말은 여기 와야 발행 된다는 말인데... 
  //이말은 /v1/token이 된다는 말인가?
  const { clientSecret } = req.body;
  try {
    const domain = await Domain.find({
      where: { clientSecret },
      include: {
        model: User,
        attribute: ['name', 'id'],
      },
    });
    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: 'Invalid Domain. Please register',
      });
    }
    const token = jwt.sign({ //making token here : ) 
      id: domain.user.id, // don't put the domain name here. just put current user id from session, and retrieve later
      name: domain.user.name,
    }, process.env.JWT_SECRET, {  // this third option not necessary. 
      expiresIn: '1m', // 1minutes
      issuer: 'StockTracker',
    });
    return res.json({
      code: 200,
      message: 'Token issued',
      token, //we insert token here. but how we use at front end?
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Server error',
    });
  }
});


router.get('/test', verifyToken, (req, res) => {
  res.json(req.decoded);
});

router.get('/favoritelist/my', verifyToken, (req, res) => {
  Favoritelist.findAll({ where: { userId: req.decoded.id } }) //awaits를 안쓰면 어떤 일이 일어나나
    .then((stocklist) => {
      console.log(stocklist);
      res.json({
        code: 200,
        payload: stocklist, //is it ok to put it in payload? 
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: 'Server error'
      });
    });
});

router.get('/stocks/my', verifyToken, (req, res) => {
  Stock.findAll({ where: { userId: req.decoded.id } }) //awaits를 안쓰면 어떤 일이 일어나나
    .then((stocks) => {
      console.log(stocks);
      res.json({
        code: 200,
        payload: stocks, //is it ok to put it in payload? 
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: 'Server error'
      });
    });
});

//post to be added as well! 

module.exports = router;
