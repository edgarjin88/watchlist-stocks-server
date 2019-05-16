

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




// router.post('/addstock', async (req, res, next) => {
//   try{

//     let stock = await Stock.create({
//       stocksymbol: req.body.stocksymbol})

//     await stock.setUsers(req.user.id) //set the id of current user

//     res.json(stock)
//   } catch(error){ 
//       next(error)
  
// }})

//getStock 이걸로 지워 보자. stock에서 시작한 후,getStock으로 가서, 삭제
// currently working on remove
// @Kamilius assuming it's a N:M relation where RecipesDays is a join table you should be able to do something like day.removeRecipes(recipe);
// https://github.com/sequelize/sequelize/issues/2695


router.post('/deletestock', async (req, res, next) => {
  try{
    console.log('delete stock fired');
    console.log('thisis UserStock ::', UserStock);
    // console.log('thisis db ::', db.UserStock);
    console.log('End of db.UserStock::');
    // console.log('thisis db ::', db.UserStock)
    // UserStock
    //to delete a stock that owned by current user from joint table, not from stock table
    // models.exercise_muscle_tie.destroy({ where: { exerciseId: 1856, muscleId: 57344 } })
    // let users = await User.find({where:{id: req.user.id}})

    let user = await User.find({where:{id: req.user.id}}) //app stocks
    // console.log('!!!!this is current user', user);
    let userowned = await user.getStocks({where:{stocksymbol:'tst1'}})//userowned?
    // console.log('thisis user owned stocks:', userowned); //user list that owned apple
    // let ownedstocks = await 
    // userowned.destroy()
    // await User.removeStock({where:{}});
    // console.log('this is destroeyd', destoryed);

    // UserStock.destroy(userowned)

    // await UserStock.destory(userowned)

//     3: On the CourseUser model, without having a CourseUser instance available:

// db.CourseUser.destroy({
//     where: {...}
// });
// 4: Having a CourseUser instance available:

// courseUser.destroy();



    // res.json(destoryed)
  }catch(error){ 
      next(error)
}})


router.post('/addlist', async (req, res, next) => {
  try{
    let prevList = await Favoritelist.find({where:{
      owner:req.user.id  
    }})

    if(!prevList){
      let stocklist = await Favoritelist.create({
        // listname: req.body.listname,
        listcontents: req.body.listcontents,
        owner:req.user.id  //could be wrong. To be checked. 
      })
      console.log(console.log('stocklist created',stocklist));
    } else{

      let stocklist = await Favoritelist.find({where:{
        owner: req.user.id }})
      await stocklist.destroy()

      let newstocklist = await Favoritelist.create({
        // listname: req.body.listname,
        listcontents: req.body.listcontents,
        owner:req.user.id  //could be wrong. To be checked. 
      })
      console.log('stocklist created',newstocklist);

    }
  

    // await stock.setUsers(req.user.id) //set the id of current user
    console.log('stocklist done', stocklist);
  } catch(error){ 
      next(error)
  
} } )

router.post('/deletelist', async (req, res, next) => {
  try{
    console.log('deletelist fired');
    let stocklist = await Favoritelist.find({where:{
      owner:req.user.id  
    }})

    if(stocklist){
      await stocklist.destroy()
      res.json({"message":"Deleted successfully"})
    }else{
      res.json({"message": "You don't have any stocklist to delete"})
    }
    

    // await stock.setUsers(req.user.id) //set the id of current user
    console.log('deletelist completed');
  } catch(error){ 
      next(error)
  
} } )
 


router.get('/mylist', async (req, res, next) => {
  try{
    
    let stock = await Favoritelist.find({where: {owner: req.user.id}})
    if(!stock){
      console.log('you don not have any stocklist');
      res.json({"stocklist": "googl,aapl,msft,fb,dis,amzn,baba,jnj,brk.a,jpm"})
    }else{
      console.log(' your stock list is as below');
      res.json({"stocklist":stock[0].listcontents})
    }

    // await stock.setUsers(req.user.id) //set the id of current user
    
  } catch(error){ 
      next(error)
  
}})

module.exports = router;
