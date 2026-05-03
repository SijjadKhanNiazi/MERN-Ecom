import {
  ShoppingCart,
  Store,
  User,
  LogOut,
  Package,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { userInfo, logout } = useContext(AuthContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 items-center py-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Store size={24} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-gray-900">
              Sijjad's <span className="text-blue-600">Store</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-6">
            <Link
              to="/cart"
              className="relative p-2.5 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all duration-300"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="relative flex items-center gap-3">
                <Link
                  to="/myorders"
                  className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-blue-600 bg-gray-50 px-4 py-2.5 rounded-2xl transition-all"
                >
                  <Package size={18} />
                  My Orders
                </Link>

                <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden md:block"></div>

                <div className="flex items-center gap-3 pl-2">
                  <div className="flex flex-col items-end hidden sm:flex">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      Customer
                    </span>
                    <span className="text-sm font-black text-gray-800">
                      {userInfo.name.split(" ")[0]}
                    </span>
                  </div>

                  <button
                    onClick={logout}
                    className="p-2.5 text-red-500 bg-red-50 hover:bg-red-100 border border-red-100 rounded-2xl transition-all"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-2xl font-bold hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-gray-200"
              >
                <User size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
