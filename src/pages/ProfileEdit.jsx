import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsername(user.name);
      setPreviewImage(user.profilePicture || "default-profile-picture.png"); // Default image if not set
    }
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);
      if (profilePicture) formData.append("profilePicture", profilePicture);

      const { data } = await axios.put(
        "http://13.212.247.124:3000/user/update",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      Swal.fire({
        title: "Profile updated!",
        text: data.message,
        icon: "success",
      });

      localStorage.setItem(
        "user",
        JSON.stringify({ ...JSON.parse(localStorage.getItem("user")), ...data })
      );

      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "An error occurred",
        icon: "error",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Your account will be permanently deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete("http://13.212.247.124:3000/user/delete", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        Swal.fire({
          title: "Deleted!",
          text: "Your account has been deleted.",
          icon: "success",
        });

        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "An error occurred",
        icon: "error",
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-60 p-8 sm:p-16 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8">
          User <span className="text-red-500">Settings</span>
        </h1>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="text-center">
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-400"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-gray-500 focus:outline-none sm:text-base"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md focus:outline-none focus:ring focus:ring-red-500 transition duration-200"
            >
              Update Profile
            </button>
          </div>
        </form>
        <div className="mt-6">
          <p
            onClick={handleDeleteAccount}
            className="text-white-500 hover:underline text-center"
          >
            Delete Account
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
