const { DataTypes } = require("sequelize")
const { sequelize } = require(".")

module.exports= (sequelize,DataTypes)=>{
    const Product = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.TEL
    },
    location: {
        type: DataTypes.TEXT
    },
    category:{
        type: DataTypes.STRING
    },
    stock_quantity:{
        type: DataTypes.INTEGER
    }
})
return Product
}

