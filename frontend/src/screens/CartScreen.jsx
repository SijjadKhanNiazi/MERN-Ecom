import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const CartScreen = () => {
  const navigate = useNavigate();

  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate("/login?redirect=shipping");
    } else {
      navigate("/shipping");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-gray-500 mb-6">Aapka cart khali hai!</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Lets Shop!
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm"
              >
                <img
                  src={
                    item.image && item.image.startsWith("http")
                      ? item.image
                      : `http://localhost:5000${item.image}`
                  }
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />

                <div className="flex-1 min-w-[200px]">
                  <Link
                    to={`/product/${item._id}`}
                    className="font-bold text-lg text-gray-800 hover:text-blue-600 transition"
                  >
                    {item.name}
                  </Link>
                  <p className="text-blue-600 font-bold text-xl mt-1">
                    ${item.price}
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-200">
                  <button
                    onClick={() => addToCart(item, item.qty - 1)}
                    disabled={item.qty <= 1}
                    className="p-1 hover:bg-white hover:shadow-sm rounded-md disabled:opacity-30"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="font-bold w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => addToCart(item, item.qty + 1)}
                    disabled={item.qty >= item.countInStock}
                    className="p-1 hover:bg-white hover:shadow-sm rounded-md disabled:opacity-30"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:bg-red-50 p-3 rounded-xl transition"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-md h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Order Summary
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Items Total:</span>
                <span className="font-semibold text-gray-900">
                  {totalItems}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span className="text-green-600 font-semibold font-sans">
                  FREE
                </span>
              </div>
              <div className="border-t pt-4 flex justify-between items-end">
                <span className="text-gray-800 font-medium">Total Amount:</span>
                <span className="text-3xl font-black text-blue-600">
                  ${totalPrice}
                </span>
              </div>
            </div>

            <button
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-black transition-all transform active:scale-95 shadow-lg shadow-gray-200"
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>

            <p className="text-center text-gray-400 text-xs mt-6">
              Secure Checkout • 7 Days Replacement
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
