
const Product = require("../models/product");
const Purchase = require("../models/purchase");
const Sales = require("../models/sales");

// Add Product
const addProduct = (req, res) => {
  console.log("req: ", req.body.userId);
  const addProduct = new Product({
    userID: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
  });
  

  addProduct
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error("Error adding product:", err);
      res.status(500).json({ error: "Failed to add product" });
    });
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const findAllProducts = await Product.find({
      userID: req.params.userId,
    }).sort({ _id: -1 }); // -1 for descending;
    res.json(findAllProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Delete Selected Product
const deleteSelectedProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.deleteOne({ _id: req.params.id });
    const deletePurchaseProduct = await Purchase.deleteOne({
      ProductID: req.params.id,
    });
    const deleteSaleProduct = await Sales.deleteOne({
      ProductID: req.params.id,
    });
    res.json({ deleteProduct, deletePurchaseProduct, deleteSaleProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

// Update Selected Product
const updateSelectedProduct = async (req, res) => {
  try {
    const updatedResult = await Product.findByIdAndUpdate(
      { _id: req.body.productID },
      {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
      },
      { new: true }
    );
    console.log(updatedResult);
    res.json(updatedResult);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Search Products
const searchProduct = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const products = await Product.find({
      name: { $regex: searchTerm, $options: "i" },
    });
    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Failed to search products" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  deleteSelectedProduct,
  updateSelectedProduct,
  searchProduct,
};
