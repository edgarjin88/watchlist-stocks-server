module.exports = (sequelize, DataTypes) =>{
  return sequelize.define('stock', {

    stocksymbol: {
      type: DataTypes.STRING(20),
      allowNull: false, 
      unique: false,

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