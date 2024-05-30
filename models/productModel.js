module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {  // Note the capital 'P' in 'Product'
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    stock_quantity: {
      type: DataTypes.INTEGER
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  return Product;
};
