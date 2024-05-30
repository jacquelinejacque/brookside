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
const Product = db.products;

const addProduct = async (req, res) => {
  try {
    console.log('Request body:', req.body);

    if (!req.body.name || !req.body.price) {
      return res.status(400).send({ message: 'Name and Price are required' });
    }

    let info = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      stock_quantity: req.body.stock_quantity
    };

    const product = await Product.create(info);
    res.status(200).send(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send({ message: 'An error occurred while adding the product.' });
  }
};

const getAllProducts = async (req, res) => {
  let products = await Product.findAll({});
  res.status(200).send(products);
};

const getOneProduct = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne({ where: { id: id } });
  res.status(200).send(product);
};

const updateProduct = async (req, res) => {
  let id = req.params.id;
  let updatedData = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    stock_quantity: req.body.stock_quantity
  };
  await Product.update(updatedData, { where: { id: id } });
  res.status(200).send(updatedData);
};

const deleteProduct = async (req, res) => {
  let id = req.params.id;
  await Product.destroy({ where: { id: id } });
  res.status(200).send('Product is deleted');
};

const getpublishedProduct = async (req, res) => {
  let products = await Product.findAll({ where: { published: true } });
  res.status(200).send(products);
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getpublishedProduct
};
