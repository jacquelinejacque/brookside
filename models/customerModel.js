module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    // Define your model attributes here
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Customer;
};
