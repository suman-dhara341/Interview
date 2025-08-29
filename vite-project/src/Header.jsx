import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">My React App</h1>

        <nav className="flex space-x-4">
          <Link to="/todo" className="hover:text-yellow-300 cursor-pointer">
            Todo List
          </Link>
          <Link to="/ApiTodo" className="hover:text-yellow-300 cursor-pointer">
            API Tasks
          </Link>
          <Link to="/form" className="hover:text-yellow-300 cursor-pointer">
            Profile Form
          </Link>
          {!token ? (
            <Link to="/login" className="hover:text-yellow-300 cursor-pointer">
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
            >
              Logout
            </button>
          )}
          <Link
            to="/protected"
            className="hover:text-yellow-300 cursor-pointer"
          >
            Protected
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
