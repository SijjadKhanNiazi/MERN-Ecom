import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ShoppingCart } from "lucide-react";

const ProductScreen = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `http://localhost:5000/api/products/${id}`,
        );

        setProduct(data);
        setError("");
      } catch (err) {
        setError(err.message || "Product load nahi ho raha");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, qty);
    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Product load ho raha hai...
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 overflow-x-hidden">
      {/* Back button */}
      <Link
        to="/"
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition"
      >
        <ArrowLeft size={20} /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <img
            src={
              product.image?.startsWith("http")
                ? product.image
                : `http://localhost:5000${product.image}`
            }
            alt={product.name}
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-blue-600">
              ${product.price}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.countInStock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Quantity */}
          {product.countInStock > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <span className="font-bold">Quantity:</span>

              <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="bg-gray-100 border p-2 rounded-lg outline-none"
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className="flex items-center justify-center gap-3 bg-gray-900 text-white py-4 px-8 rounded-xl font-bold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={22} />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
