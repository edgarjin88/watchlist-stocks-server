

const express = require('express');
const uuidv4 = require('uuid/v4');
const { User, Stock, UserStock, Favoritelist  } = require('../models');

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

    res.json(stock)
  } catch(error){ 
      next(error)
  
}})

//getStock 이걸로 지워 보자. stock에서 시작한 후,getStock으로 가서, 삭제
// currently working on remove
// @Kamilius assuming it's a N:M relation where RecipesDays is a join table you should be able to do something like day.removeRecipes(recipe);
// https://github.com/sequelize/sequelize/issues/2695

// router.post('/deletestock', async (req, res, next) => {
//   try{
//     // models.exercise_muscle_tie.destroy({ where: { exerciseId: 1856, muscleId: 57344 } })
//     let stockid = await Stock.find({where})
//     let stock1 = await UserStock.find({
//       where:{
//         userId: req.user.id,
//         stockId: number }
//       })

//     await stock.setUsers(req.user.id) //set the id of current user

//     res.json(stock)
//   } catch(error){ 
//       next(error)
  
// }})

router.post('/addlist', async (req, res, next) => {
  try{

    let stocklist = await Favoritelist.create({
      listname: req.body.listname,
      listcontents: req.body.listcontents,
      owner:req.user.id  //could be wrong. To be checked. 
    })

    // await stock.setUsers(req.user.id) //set the id of current user
    console.log('stocklist done', stocklist);
  } catch(error){ 
      next(error)
  
} } )
 


router.get('/mylist', async (req, res, next) => {
  try{

    let stock = await Favoritelist.findAll({where: {owner: req.user.id}})

    // await stock.setUsers(req.user.id) //set the id of current user
    res.json(stock)
  } catch(error){ 
      next(error)
  
}})

module.exports = router;
