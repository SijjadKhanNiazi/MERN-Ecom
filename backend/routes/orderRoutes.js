const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  getMyOrders,
  deleteOrder,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, addOrderItems);

router.get("/myorders", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

router.delete("/:id", protect, deleteOrder);

module.exports = router;
