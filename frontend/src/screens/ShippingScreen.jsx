import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShippingScreen = () => {
  const shippingAddress =
    JSON.parse(localStorage.getItem("shippingAddress")) || {};

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || "",
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ address, city, postalCode, country }),
    );

    navigate("/payment");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">
        Shipping Details
      </h1>

      <form onSubmit={submitHandler} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-blue-500 transition"
            placeholder="Mohalla, Street, House No."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-blue-500 transition"
              placeholder="Mianwali"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Postal Code
            </label>
            <input
              type="text"
              className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-blue-500 transition"
              placeholder="42200"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-blue-500 transition"
            placeholder="Pakistan"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-md mt-4">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default ShippingScreen;
