const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("Order mein koi items nahi hain");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  // .populate user field se name aur email nikal kar dega
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order nahi mila");
  }
});
// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    // Security check: Sirf wahi banda delete kar sake jisne order kiya
    if (order.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can only delete your own orders");
    }

    await order.deleteOne();
    res.json({ message: "Order removed" });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
module.exports = { addOrderItems, getOrderById, getMyOrders, deleteOrder };
