module.exports = (sequelize, DataTypes) =>{
  return sequelize.define('favoritelist', {

    listname: {
      type: DataTypes.STRING(50),
      allowNull: false, 
      unique: false,

    },
    listcontents: {
      type: DataTypes.TEXT,
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