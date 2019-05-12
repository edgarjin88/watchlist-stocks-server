module.exports = (sequelize, DataTypes) =>{
  //is DataTypes == Sequalize Class? 
  //if so, why from the beginning class methods were not herited to each instance?
  //for performance? 
  //prototype을 써도, 나중에 바뀔 위험이 있기 때문에 안전을 위해서라도. 인캡슐레이션

  return sequelize.define('user', {

    name: {
      type: DataTypes.STRING(20),
      allowNull: false, 
      unique: false,

    }, 
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false, 
      unique: true
    }, 
    password:{
      type: DataTypes.STRING(500),
      allowNull: false, 
      unique: false
    }, 
    created_at: {
      type: DataTypes.DATE, 
      allowNull: false, 
      defaultValue: sequelize.literal('now()'),
    }
  }, {
    timestamps: false
    //necessary?
  } )

}; 