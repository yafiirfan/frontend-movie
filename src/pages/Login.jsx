import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      let requestBody = { email, password };
      let { data } = await axios.post(
        "http://13.212.247.124:3001/login",
        requestBody
      );
      localStorage.setItem("access_token", data.access_token);
      Swal.fire({
        title: "Login success!",
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  const handleCredentialResponse = async (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    try {
      let { data } = await axios.post(
        `http://13.212.247.124:3001/google-login`,
        {},
        {
          headers: {
            googletoken: response.credential,
          },
        }
      );

      console.log(data, "here google login");
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (e) {
      console.log("🚀 ~ handleCredentialResponse ~ e:", e);
    }
  };

  const googleSing = () => {
    google.accounts.id.initialize({
      // fill this with your own client ID
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      // callback function to handle the response
      callback: async (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
        const { data } = await axios.post(
          "http://13.212.247.124:3001/google-login",
          {
            googleToken: response.credential,
          }
        );

        localStorage.setItem("access_token", data.access_token);

        // navigate to the home page or do magic stuff
        navigate("/");
      },
    });
    google.accounts.id.renderButton(
      // HTML element ID where the button will be rendered
      // this should be existed in the DOM
      document.getElementById("buttonDiv"),
      // customization attributes
      { theme: "outline", size: "large" }
    );
    // to display the One Tap dialog, or comment to remove the dialog
    google.accounts.id.prompt();
  };

  useEffect(() => {
    // window.google.accounts.id.initialize({
    //   client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    //   callback: handleCredentialResponse,
    // });
    // window.google.accounts.id.renderButton(
    //   document.getElementById("buttonDiv"),
    //   { theme: "outline", size: "large" }
    // );
    googleSing();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-800 bg-opacity-60 p-8 sm:p-16 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8">
          Log<span className="text-red-500">in</span>
        </h1>
        <h2 className="text-lg text-center text-gray-300 mb-6">Login Now</h2>
        <form onSubmit={handleLogin} className="space-y-6">
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
              Log In
            </button>
          </div>
          <div className="flex justify-center items-center mb-4">
            <div id="buttonDiv" className="w-full"></div>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="/register" className="text-red-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
