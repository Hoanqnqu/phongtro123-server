'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //   Area.belongsTo(models.Image, {foreignKey: 'imagesID', targetKey:'id', as:'images' })
    //   Area.belongsTo(models.User, {foreignKey: 'userId', targetKey:'id', as:'user' })
    //   Area.belongsTo(models.Attribute, {foreignKey: 'attributesId', targetKey:'id', as:'attributes' })


    }
  }
  Area.init({
   code:DataTypes.STRING,
   order:DataTypes.STRING,
   value:DataTypes.STRING,

   
  }, {
    sequelize,
    modelName: 'Area',
  });
  return Area;
};