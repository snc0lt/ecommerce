const {DataTypes} = require('sequelize');
const sequelize = require('sequelize');

module.exports=(sequelize)=>{
    const Category= sequelize.define('category',{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
}