'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //   Price.belongsTo(models.Image, {foreignKey: 'imagesID', targetKey:'id', as:'images' })
    //   Price.belongsTo(models.User, {foreignKey: 'userId', targetKey:'id', as:'user' })
    //   Price.belongsTo(models.Attribute, {foreignKey: 'attributesId', targetKey:'id', as:'attributes' })


    }
  }
  Price.init({
   code:DataTypes.STRING,
   order:DataTypes.STRING,

   value:DataTypes.STRING,
 
   
  }, {
    sequelize,
    modelName: 'Price',
  });
  return Price;
};