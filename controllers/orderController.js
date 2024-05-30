const db = require('../models');
const Order = db.orders;

const addOrder = async (req, res) => {
  try {
    let info = {
      order_date: req.body.order_date,
      status: req.body.status,
      total_price: req.body.total_price
    };

    const order = await Order.create(info);
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    let orders = await Order.findAll({});

    const formattedOrders = orders.map(order => ({
      order_date: formatDate(order.order_date),
      status: order.status,
      total_price: order.total_price
    }));

    res.status(200).send(formattedOrders);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getOneOrder = async (req, res) => {
  try {
    let id = req.params.id;
    let order = await Order.findOne({ where: { id: id } });

    if (!order) {
      res.status(404).send({ message: 'Order not found' });
      return;
    }

    const formattedOrder = {
      order_date: formatDate(order.order_date),
      status: order.status,
      total_price: order.total_price
    };

    res.status(200).send(formattedOrder);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    let id = req.params.id;
    let updatedData = {
      order_date: req.body.order_date,
      status: req.body.status,
      total_price: req.body.total_price,
    };
    await Order.update(updatedData, { where: { id: id } });
    res.status(200).send(updatedData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    let id = req.params.id;
    await Order.destroy({ where: { id: id } });
    res.status(200).send('Order is deleted');
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

function formatDate(date) {
  // Assuming date is a Date object
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

module.exports = {
  addOrder,
  getAllOrders,
  getOneOrder,
  updateOrder,
  deleteOrder
};
