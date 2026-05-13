import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filtering States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(10000); // Default high value

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data);

        // Max price dynamically set karna taake slider sahi kaam kare
        if (data.length > 0) {
          const highestPrice = Math.max(...data.map((p) => p.price));
          setMaxPrice(highestPrice);
        }

        setError("");
      } catch (err) {
        setError(err.message || "Backend se data nahi mil raha");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter Logic (Search + Category + Price)
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  if (loading)
    return (
      <div className="flex justify-center items-center mt-20 text-xl font-semibold">
        Loading Products...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center mt-20 text-red-500">
        {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 mb-10 overflow-x-hidden">
      {/* Search and Filters Section */}
      <div className="bg-gray-50 p-6 rounded-xl mb-8 mt-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* 1. Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Product
            </label>
            <input
              type="text"
              placeholder="E.g. iPhone, Shoes..."
              className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 2. Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="border p-2 rounded-lg w-full bg-white outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Price Filter */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">
                Max Price:
              </label>
              <span className="text-sm font-bold text-blue-600">
                ${maxPrice}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={
                products.length > 0
                  ? Math.max(...products.map((p) => p.price))
                  : 10000
              }
              step="10"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-400 italic">
          Showing {filteredProducts.length} out of {products.length} products
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="max-w-[220px] mx-auto w-full transition-transform hover:scale-105"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed">
          <p className="text-gray-500 text-lg">
            Aapke criteria ke mutabiq koi product nahi mila.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setMaxPrice(10000);
            }}
            className="mt-4 text-blue-600 underline font-medium"
          >
            Filters reset karein
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
