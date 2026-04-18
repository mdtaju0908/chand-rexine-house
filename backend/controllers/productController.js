const Product = require('../models/Product.js');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const products = await Product.find({ ...keyword });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      images,
      retailPrice,
      dealerPrice,
      moq,
      visibility,
      stock,
      isBestSeller,
    } = req.body;

    const product = new Product({
      name,
      category,
      description,
      images,
      retailPrice,
      dealerPrice,
      moq,
      visibility,
      stock,
      isBestSeller,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      images,
      retailPrice,
      dealerPrice,
      moq,
      visibility,
      stock,
      isBestSeller,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.category = category || product.category;
      product.description = description || product.description;
      product.images = images || product.images;
      product.retailPrice = retailPrice || product.retailPrice;
      product.dealerPrice = dealerPrice || product.dealerPrice;
      product.moq = moq || product.moq;
      product.visibility = visibility || product.visibility;
      product.stock = stock || product.stock;
      product.isBestSeller = isBestSeller !== undefined ? isBestSeller : product.isBestSeller;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get top rated/demanded products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = async (req, res) => {
  try {
    // Assuming 'demand' or 'isBestSeller' indicates top products
    const products = await Product.find({ isBestSeller: true }).limit(5);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
};
