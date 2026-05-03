import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MyOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(
          "http://localhost:5000/api/orders/myorders",
          config,
        );
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [userInfo]);

  if (loading)
    return <div className="text-center mt-20 font-bold">Orders Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-20 text-red-500 font-bold">{error}</div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black mb-8 text-gray-800 uppercase tracking-tighter">
        My <span className="text-blue-600">Orders</span>
      </h1>

      {orders.length === 0 ? (
        <div className="bg-blue-50 p-6 rounded-2xl text-blue-700 text-center font-medium">
          You have not placed any order right Now.{" "}
          <Link to="/" className="underline ml-2">
            Lets Shop it!
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-3xl border border-gray-100 shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">ID</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Total</th>
                <th className="px-6 py-4 font-bold">Paid</th>
                <th className="px-6 py-4 font-bold">Delivered</th>
                <th className="px-6 py-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-sm text-gray-600">
                    #{order._id.slice(-6)}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    {order.isPaid ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        PAID
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                        PENDING
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {order.isDelivered ? (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                        SHIPPED
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
                        PROCESSING
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/order/${order._id}`}
                      className="inline-block bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 transition shadow-sm"
                    >
                      DETAILS
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrdersScreen;
