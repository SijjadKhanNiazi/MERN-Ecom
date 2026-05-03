import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(
          `http://localhost:5000/api/orders/${orderId}`,
          config,
        );
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    if (!order || order._id !== orderId) {
      fetchOrder();
    }
  }, [orderId, order, userInfo]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        Fetching your orders...
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-20 text-red-500 font-bold">{error}</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-black mb-8 text-gray-800 uppercase">
        Order <span className="text-blue-600">#{order._id.slice(-6)}</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2">
              Shipping Details
            </h2>
            <p className="mb-2 text-gray-700">
              <strong>Customer:</strong> {order.user?.name || "User"}
            </p>
            <p className="mb-4 text-gray-700">
              <strong>Email:</strong> {order.user?.email || "N/A"}
            </p>
            <div className="text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="font-medium text-gray-800">
                {order.shippingAddress.address}
              </p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
            <div
              className={`mt-4 p-3 rounded-xl font-bold text-sm ${
                order.isDelivered
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {order.isDelivered
                ? `Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}`
                : "Status: Processing"}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2">
              Payment Information
            </h2>
            <p className="mb-4">
              <strong>Method:</strong>{" "}
              <span className="uppercase text-blue-600 font-bold">
                {order.paymentMethod}
              </span>
            </p>
            <div
              className={`p-3 rounded-xl font-bold text-sm ${
                order.isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {order.isPaid
                ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}`
                : "Payment: Pending"}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">
              Items Ordered
            </h2>
            <div className="space-y-4">
              {order.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0"
                >
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `http://localhost:5000${item.image}`
                    }
                    className="w-20 h-20 object-cover rounded-xl border border-gray-100"
                    alt={item.name}
                  />
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <Link
                        to={`/product/${item.product}`}
                        className="font-bold text-gray-800 hover:text-blue-600 transition"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {item.qty} x ${item.price}
                      </p>
                    </div>
                    <span className="font-bold text-gray-900">
                      ${(item.qty * item.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-md sticky top-24">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Order Summary
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600 border-b pb-2">
                <span>Estimated Total</span>
                <span className="text-2xl font-black text-blue-600">
                  ${order.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {!order.isPaid && (
              <div className="p-4 bg-blue-50 border border-blue-100 text-blue-800 rounded-2xl font-medium text-sm leading-relaxed">
                <i className="fas fa-info-circle mr-2"></i>
                We have Received your Order, it'll be delivered to you soon
                inshallah! ThankEW.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
