import React from "react";
import { FaBars, FaSearch } from "react-icons/fa";

function Navbar({ open, setOpen }) {
  return (
    <nav className="flex items-center justify-between p-4">

      {/* Menu Button */}
      <FaBars
        className="text-2xl cursor-pointer"
        onClick={() => setOpen(!open)}
      />

      {/* Search */}
      <div className="flex items-center border px-2 py-1 rounded ml-30 w-100">
        <FaSearch />
        <input
          placeholder="Search question..."
          className="ml-2 outline-none"
        />
      </div>

      {/* User */}
      <div className="flex items-center gap-3 p-2">
        🔔
        👤
        <p>student</p>
      </div>

    </nav>
  );
}

export default Navbar;