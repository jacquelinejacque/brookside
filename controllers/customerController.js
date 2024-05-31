// const { where } = require('sequelize');
// const db = require('../models');


// //creating main model
// const Product = db.products;
// //creating aproduct
// const addProduct=async(req,res) =>{
//     let info= {
//         name:req.body.name,
//         price:req.body.price,
//         description:req.body.description,
//         category:req.body.category,
//         stock_quantity:req.body.stock_quantity
//     }

//     const product= await Product.create(info);
//     res.status(200).send(product)
// }

// //getting all products
// const getAllProducts= async(req,res)=>{
//     let products= await Product.findAll({});
//     res.status(200).send(products);
// }

// //getting a single product
// const getOneProduct= async(req,res)=>{
//     let id=req.params.id;
//     let product= await Product.findOne({where: {id:id}})
//     res.status(200).send(product);
// }

// //updating a  product
// const updateProduct= async(req,res)=>{
//     let id=req.params.id;
//     let product= await Product.update((req,res), {where: {id:id}})
//     res.status(200).send(product)
// }

// //deleting a product by id
// const deleteProduct= async(req,res)=>{
//     let id=req.params.id;
//     await Product.destroy({where: {id: id}})
//     res.status(200).send('Product is deleted')
// }

// //publishing a product by id
// const getpublishedProduct= async(req,res)=>{
//     let id=req.params.id;
//     let product= await Product.findAll({where: {published:true}})
//     res.status(200).send(product)
// }

// module.exports= {
//     addProduct,
//     getAllProducts,
//     getOneProduct,
//     updateProduct,
//     deleteProduct,
//     getpublishedProduct
// }


const db = require('../models');

// Creating main model
const Customer = db.customers;

const addCustomer = async (req, res) => {
  try {
    console.log('Request body:', req.body);

    if (!req.body.customer_name || !req.body.stock_quantity) {
      return res.status(400).send({ message: 'CustomerName and Stock quantity are required' });
    }

    let info = {
      customer_name: req.body.customer_name,
      phone_number: req.body.phone_number,
      location: req.body.location,
      stock_quantity: req.body.stock_quantity
    };

    const customer = await Customer.create(info);
    res.status(200).send(customer);
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).send({ message: 'An error occurred while adding the customer.' });
  }
};

const getAllCustomers = async (req, res) => {
  let customers = await Customer.findAll({});
  res.status(200).send(customers);
};

const getOneCustomer= async (req, res) => {
  let id = req.params.id;
  let customer = await Customer.findOne({ where: { id: id } });
  res.status(200).send(customer);
};

const updateCustomer = async (req, res) => {
  let id = req.params.id;
  let updatedData = {
    customer_name: req.body.customer_name,
    phone_number: req.body.phone_number,
    location: req.body.location,
    stock_quantity: req.body.stock_quantity
  };
  await Customer.update(updatedData, { where: { id: id } });
  res.status(200).send(updatedData);
};

const deleteCustomer = async (req, res) => {
  let id = req.params.id;
  await Customer.destroy({ where: { id: id } });
  res.status(200).send('customer is deleted');
};

module.exports = {
  addCustomer,
  getAllCustomers,
  getOneCustomer,
  updateCustomer,
  deleteCustomer,
};
