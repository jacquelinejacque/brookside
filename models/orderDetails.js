const { DataTypes } = require("sequelize")
const { sequelize } = require(".")

module.exports= (sequelize,DataTypes)=>{
    const Order = sequelize.define('order', {
    order_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    status: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    subtotal_price:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
})
return Order
}

