import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    try {
      let requestBody = { username, email, password };
      await axios.post("http://13.212.247.124:3001/register", requestBody);
      Swal.fire({
        title: "Registration success!",
        icon: "success",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-800 bg-opacity-60 p-8 sm:p-16 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8">
          Regis<span className="text-red-500">ter</span>
        </h1>
        <h2 className="text-lg text-center text-gray-300 mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              required
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-grey-500 focus:outline-none sm:text-base"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="email-address"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email-address"
              name="email"
              type="email"
              autoComplete="off"
              required
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-grey-500 focus:outline-none sm:text-base"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
              autoComplete="off"
              required
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-grey-500 focus:outline-none sm:text-base"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md focus:outline-none focus:ring focus:ring-purple-500 transition duration-200"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-red-500 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
