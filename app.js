const express = require('express');
const cors = require('cors');
const db = require('./models'); // Import the whole db object
const Product = db.Product; // Get the Product model from the db object

const app = express();
const corsOptions = {
  origin: 'http://localhost:8080',
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Loading style.css as a static file
app.use(express.static('public'));

// Registering ejs view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/products');
});
//creating a new product
app.get('/api/products/create', (req, res) => {
  res.render('create', { title: 'Create New Product' });
});

//rendering the home view as all products created
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'DESC']] });
    res.render('home', { title: 'All Products', products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//adding a newly created product to the home view
app.post('/products', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.redirect('/products');
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//getting a  single product by id
app.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId); // Use Sequelize's findByPk method

    if (product) {
      res.render('details', { title: 'Product Details', product });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.destroy({ where: { id: productId } }); // Use Sequelize's destroy method

    if (deletedProduct) {
      res.status(204).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//updating a product 
// 1. defining a get route to display an update form
app.get('/products/:id/edit', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);

    if (product) {
      res.render('editProduct', { title: 'Edit Product', product });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product for edit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 2. Defining a put route to handle the update functionality
const methodOverride = require('method-override');
app.use(methodOverride('_method')); // To support PUT and DELETE from forms

app.put('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.update(req.body, {
      where: { id: productId }
    });

    if (updatedProduct[0] > 0) { // Sequelize returns an array, the first element is the number of affected rows
      res.redirect(`/products/${productId}`);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//order routes

//creating a new order
app.get('/api/orders/create', (req, res) => {
  res.render('createOrder', { title: 'Create New Product' });
});

//rendering the home view as all products created
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'DESC']] });
    res.render('home', { title: 'All Products', products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//adding a newly created product to the home view
app.post('/products', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.redirect('/products');
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//getting a  single product by id
app.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId); // Use Sequelize's findByPk method

    if (product) {
      res.render('details', { title: 'Product Details', product });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.destroy({ where: { id: productId } }); // Use Sequelize's destroy method

    if (deletedProduct) {
      res.status(204).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//updating a product 
// 1. defining a get route to display an update form
app.get('/products/:id/edit', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);

    if (product) {
      res.render('editProduct', { title: 'Edit Product', product });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product for edit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 2. Defining a put route to handle the update functionality
const methodOverride = require('method-override');
app.use(methodOverride('_method')); // To support PUT and DELETE from forms

app.put('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.update(req.body, {
      where: { id: productId }
    });

    if (updatedProduct[0] > 0) { // Sequelize returns an array, the first element is the number of affected rows
      res.redirect(`/products/${productId}`);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// handling page not found
app.use((req, res, next) => {
  res.status(404).render('404', { title: '404 - Page Not Found' });
})



// Routers
const productRouter = require('./routes/productRouter.js');
app.use('/api/products', productRouter);

const orderRouter = require('./routes/orderRouter.js');
const { render } = require('ejs');
app.use('/api/orders', orderRouter);


// Port
const PORT = process.env.PORT || 8080;

// Server
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
