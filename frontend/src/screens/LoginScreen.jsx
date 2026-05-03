import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(AuthContext);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        config,
      );

      setUserInfo(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      alert(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h1>
      <p className="text-gray-500 mb-8">Login to your Account.</p>

      <form onSubmit={submitHandler} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-100">
          Sign In
        </button>
      </form>

      <div className="mt-8 text-center text-gray-600">
        New here?{" "}
        <Link
          to="/register"
          className="text-blue-600 font-bold hover:underline"
        >
          Create Account.
        </Link>
      </div>
    </div>
  );
};

export default LoginScreen;
