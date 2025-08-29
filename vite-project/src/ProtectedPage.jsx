import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        if (res.status === 200) {
          setUser(res.data.user.username);
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkAuth();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  if (!token) {
    alert("Please login first");
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Welcome to {user}
        </h1>
        <p className="text-gray-600 mb-6">You are logged in!</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProtectedPage;
