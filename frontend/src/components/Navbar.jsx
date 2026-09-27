import React from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar({ open, setOpen }) {

  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between p-4">

      {/* Menu Button */}
      <FaBars
        className="text-2xl cursor-pointer"
        onClick={() => setOpen(!open)}
      />

      
      <div className="flex items-center border px-2 py-1 rounded ml-30 w-100">
        <FaSearch />

        <input
          placeholder="Search question..."
          className="ml-2 outline-none"
        />
      </div>

      
      <div className="flex items-center gap-3 p-2">
        🔔
        👤
        <p>student</p>

        <button
          onClick={() => navigate("/register")}
          className=" text-black px-3 py-2 rounded-lg"
        >
          Register
        </button>
      </div>

    </nav>
  );
}

export default Navbar;