module.exports = (sequelize, DataTypes) =>{
  return sequelize.define('favoritelist', {

    listname: {
      type: DataTypes.STRING(50),
      allowNull: false, 
      unique: true,

    },
    listcontents: {
      type: DataTypes.TEXT,
      allowNull: false, 
      // unique: true,

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