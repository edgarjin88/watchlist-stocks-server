'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const env =  process.env.NODE_ENV || 'development'; // currently string development is going to be the value
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {}; 
const sequelize = new Sequelize(config.database, config.username, config.password, config)
console.log('this is "config" variable :,', config);

//why do I have to give 'config in the end again? 

db.sequelize = sequelize; 
// sequelize instance, db itself?

db.Sequelize = Sequelize; 
//Sequelize = class? why do I need to make it again when I have already imported the class?
// Current Sequlize class is within index.js file. If i assign it to db.Sequelize, it cas be
//used in each db? 
//1. Class is defined only here. 
// db.Sequelize는 그냥 Sequzlie를 연결한 레퍼런스고, 이것 나중에 쓰기 위해서이다. 
// db.sequzlie는 객체 그 자체. 

db.User = require('./user')(sequelize, Sequelize);
db.Stock = require('./stock')(sequelize, Sequelize); 
db.Favoritelist = require('./favoritelist')(sequelize, Sequelize)

db.User.hasMany(db.Favoritelist, {foreignKey: 'owner', sourceKey: 'id'});
db.Favoritelist.belongsTo(db.User, {foreignKey: 'owner', targetKey: 'id'});


db.Favoritelist.belongsTo(db.User)
db.User.belongsToMany(db.Stock, {through: 'UserStock'});
db.Stock.belongsToMany(db.User, {through: 'UserStock'})

module.exports = db; 



///below is the original version 

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
