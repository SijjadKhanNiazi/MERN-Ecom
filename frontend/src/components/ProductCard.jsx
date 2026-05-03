import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const imageUrl =
    product.image && product.image.startsWith("http")
      ? product.image
      : `http://localhost:5000${product.image}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
      <div className="h-56 bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-auto object-cover hover:scale-105 transition duration-300"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300?text=No+Image";
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-xl font-bold text-blue-600 mt-2">${product.price}</p>
        <Link
          to={`/product/${product._id}`}
          className="block text-center w-full mt-4 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
