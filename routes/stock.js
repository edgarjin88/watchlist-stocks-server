

const express = require('express');
const uuidv4 = require('uuid/v4');
const { User, Stock, UserStock  } = require('../models');

const router = express.Router();

router.get('/mystock', async (req, res, next) => {

try{
  let users = await User.find({where:{id: req.user.id}})
  const stocks = await users.getStocks();
  
  let result = []
  stocks.forEach((a)=>

  { 
    console.log(a)
    result.push(a.stocksymbol)
  }
  )
  res.json(result)
}catch(error){
  next(error)
}

});

router.post('/addstock', async (req, res, next) => {
  try{

    let stock = await Stock.create({
      stocksymbol: req.body.stocksymbol})

    await stock.setUsers(req.user.id) //set the id of current user

  } catch(error){ 
      next(error)
  
}})

module.exports = router;
