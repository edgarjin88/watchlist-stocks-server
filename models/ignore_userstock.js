module.exports = (sequelize, DataTypes) =>{
  return sequelize.define('UserStock', {

    userId: {
      type: DataTypes.INTEGER(20),
      allowNull: false, 
      unique: false,

    },
    stockId: {
      type: DataTypes.INTEGER(20),
      allowNull: false, 
      unique: false,

    }
  }, {
    timestamps: false
    //necessary?
  } )

}; 