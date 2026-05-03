import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, setUserInfo } = useContext(AuthContext);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        "http://localhost:5000/api/users",
        { name, email, password },
        config,
      );

      setUserInfo(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      alert("Account Created Successfully!");
    } catch (error) {
      alert(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Create Account</h1>
      <p className="text-gray-500 mb-6">Be the part of Sk's Store.</p>

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-blue-500 transition"
            placeholder="Sijjad Khan"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-blue-500 transition"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-blue-500 transition"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-blue-500 transition"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-100">
          Register
        </button>
      </form>

      <div className="mt-6 text-center text-gray-600">
        Have any Account?{" "}
        <Link
          to={redirect !== "/" ? `/login?redirect=${redirect}` : "/login"}
          className="text-blue-600 font-bold hover:underline"
        >
          Login here
        </Link>
      </div>
    </div>
  );
};

export default RegisterScreen;
