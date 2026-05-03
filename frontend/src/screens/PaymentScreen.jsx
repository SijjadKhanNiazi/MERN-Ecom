import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentScreen = () => {
  const navigate = useNavigate();

  // Pehle check karein ke shipping address mojood hai ya nahi
  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Payment Method</h1>

      <form onSubmit={submitHandler} className="space-y-6">
        <div className="space-y-4">
          <label className="flex items-center p-4 border rounded-2xl cursor-pointer hover:bg-gray-50 transition border-blue-500 bg-blue-50">
            <input
              type="radio"
              className="w-5 h-5 text-blue-600"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="ml-3 font-bold text-gray-800">
              PayPal or Credit Card
            </span>
          </label>

          <label className="flex items-center p-4 border rounded-2xl cursor-pointer hover:bg-gray-50 transition">
            <input
              type="radio"
              className="w-5 h-5 text-blue-600"
              name="paymentMethod"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="ml-3 font-bold text-gray-800">Stripe</span>
          </label>

          <label className="flex items-center p-4 border rounded-2xl cursor-pointer hover:bg-gray-50 transition">
            <input
              type="radio"
              className="w-5 h-5 text-blue-600"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="ml-3 font-bold text-gray-800">
              Cash on Delivery
            </span>
          </label>
        </div>

        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-100 mt-4">
          Continue to Place Order
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;
