module.exports = (sequelize, DataTypes) => (
  sequelize.define('domain', {
    host: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    clientSecret: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    validate: { //validator code line. Not necessary. Let's remove later
      unknownType() {
        console.log(this.type, this.type !== 'free', this.type !== 'premium');
        if (this.type !== 'free' && this.type !== 'premium') {
          throw new Error('type column has to be free or premium.');
        }
      },
    },
    timestamps: true,
    paranoid: true,
  })
);
