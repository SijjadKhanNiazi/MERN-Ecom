const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// 1. Saaray products mangwanay ke liye (GET Request)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Naya product add karne ke liye (POST Request - For Testing)
router.post("/", async (req, res) => {
  try {
    const { name, price, description, category, countInStock } = req.body;

    const product = new Product({
      name,
      price,
      description,
      category,
      countInStock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "dont find any product!" });
    }
  } catch (error) {
    res.status(500).json({ message: "wrong id format or server error" });
  }
});

module.exports = router;
