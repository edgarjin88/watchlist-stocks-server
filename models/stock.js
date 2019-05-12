module.exports = (sequelize, DataTypes) =>{
  return sequelize.define('stock', {

    name: {
      type: DataTypes.STRING(20),
      allowNull: false, 
      unique: true,

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