module.exports = (sequelize, DataTypes) =>{
  return sequelize.define('favoritelist', {

    listname: {
      type: DataTypes.STRING(50),
      allowNull: true, 
      unique: false,

    },
    listcontents: {
      type: DataTypes.TEXT,
      allowNull: true, 
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