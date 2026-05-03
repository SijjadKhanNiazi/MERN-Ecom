import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { cartItems, clearCart } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);

  const shippingAddress =
    JSON.parse(localStorage.getItem("shippingAddress")) || {};
  const paymentMethod =
    JSON.parse(localStorage.getItem("paymentMethod")) || "Not Selected";

  // Calculation Logic
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;

  const placeOrderHandler = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems: cartItems.map((item) => ({
            ...item,
            product: item._id,
          })),
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
        },
        config,
      );

      setLoading(false);
      clearCart();
      navigate(`/order/${data._id}`);
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black mb-10 text-gray-900">
        Finalize Your Order
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Info */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-3 text-gray-800">
              Shipping Address
            </h2>
            <p className="text-gray-600 italic">
              {shippingAddress.address}, {shippingAddress.city}{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          {/* Payment Info */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-3 text-gray-800">
              Payment Method
            </h2>
            <p className="text-gray-600 uppercase font-bold">{paymentMethod}</p>
          </div>

          {/* Order Items */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-5 text-gray-800">
              Review Items
            </h2>
            {cartItems.length === 0 ? (
              <p>Aapka cart khali hai.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b py-4 last:border-0"
                >
                  <img
                    src={
                      item.image && item.image.startsWith("http")
                        ? item.image
                        : `http://localhost:5000${item.image}`
                    }
                    className="w-16 h-16 object-cover rounded-lg"
                    alt={item.name}
                  />
                  <div className="flex-1">
                    <Link
                      to={`/product/${item._id}`}
                      className="font-bold hover:text-blue-600 transition text-gray-800"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {item.qty} x ${item.price} ={" "}
                      <span className="font-bold text-gray-800">
                        ${(item.qty * item.price).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-md h-fit sticky top-24">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Order Summary
          </h2>
          <div className="space-y-4 text-gray-600 mb-8">
            <div className="flex justify-between">
              <span>Items</span>
              <span className="font-semibold text-gray-900">
                ${itemsPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-gray-900">
                ${shippingPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between border-t pt-4 text-2xl font-black text-gray-900">
              <span>Total</span>
              <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={placeOrderHandler}
            disabled={cartItems.length === 0 || loading}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition shadow-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100"
            }`}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
