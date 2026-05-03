import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get("http://localhost:5000/api/products");

        setProducts(data);
        setError("");
      } catch (err) {
        setError(err.message || "Backend se data nahi mil raha");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20 text-xl font-semibold">
        Loading Products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center mt-20 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 overflow-x-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Latest Products
        </h1>
        <p className="text-sm text-gray-500">{products.length} Products</p>
      </div>

      <div
        className="grid gap-6 
        grid-cols-2 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5"
      >
        {products.map((product) => (
          <div key={product._id} className="max-w-[220px] mx-auto w-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
