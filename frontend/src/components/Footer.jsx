import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

import { MapPin, Phone, Mail, Store } from "lucide-react";

import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-white">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Store size={20} className="text-white" />
              </div>

              <span className="text-xl font-black tracking-tighter">
                Sijjad's <span className="text-blue-500">Store</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed">
              My first Ecom MERN WebApp : )
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/sk.niazi.1447342"
                className="hover:text-blue-500 transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a
                href="https://github.com/SijjadKhanNiazi"
                className="hover:text-white transition-colors"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-500 transition-colors">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="hover:text-blue-500 transition-colors"
                >
                  Shopping Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/myorders"
                  className="hover:text-blue-500 transition-colors"
                >
                  Track Orders
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="hover:text-blue-500 transition-colors"
                >
                  Account Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">
              Support
            </h3>

            <ul className="space-y-3 text-sm">
              <li className="hover:text-blue-500 cursor-pointer transition-colors">
                Shipping Policy
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">
                Return & Refund
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">
                Privacy Policy
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">
                Terms of Service
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0" />
                <span>Main City, Mianwali district, Punjab</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+92 300 1234567</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>support@skstore.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <p>© {currentYear} SKStore. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Cookies
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Security
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
