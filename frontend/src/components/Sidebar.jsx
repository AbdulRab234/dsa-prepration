import {
  FaTachometerAlt,
  FaBook,
  FaClipboardList,
  FaHistory,
  FaBookmark,
  FaChartLine,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();

  return (
    <div className="w-[250px] h-full bg-[#0B1120] text-white flex flex-col p-4">

      {/* Top Section */}
      <div>

        {/* Logo */}
        <h1 className="text-xl font-bold mb-10">
          Dsa
          interview prepration
        </h1>

        {/* Menu Container */}
        <div className="space-y-4">

          {/* Dashboard */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 bg-purple-600 p-3 rounded-lg cursor-pointer"
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </div>

          {/* Subjects */}
          <div
            onClick={() => navigate("/subjects")}
            className="flex items-center gap-3 hover:bg-[#1E293B] p-3 rounded-lg cursor-pointer"
          >
            <FaBook />
            <span>Subjects</span>
          </div>

          {/* Mock Tests */}
          <div
            onClick={() => navigate("/mocktest")}
            className="flex items-center gap-3 hover:bg-[#1E293B] p-3 rounded-lg cursor-pointer"
          >
            <FaClipboardList />
            <span>Mock Tests</span>
          </div>

          <div className="flex items-center gap-3 hover:bg-[#1E293B] p-3 rounded-lg cursor-pointer">
            <FaHistory />
            <span>Previous Tests</span>
          </div>

          <div className="flex items-center gap-3 hover:bg-[#1E293B] p-3 rounded-lg cursor-pointer">
            <FaBookmark />
            <span>Bookmarks</span>
          </div>

          <div className="flex items-center gap-3 hover:bg-[#1E293B] p-3 rounded-lg cursor-pointer">
            <FaChartLine />
            <span>YourProgress</span>
          </div>

          <div className="flex items-center gap-3 hover:bg-[#1E293B] p-3 rounded-lg cursor-pointer">
            <FaUser />
            <span>Profile</span>
          </div>

          <div className="flex items-center gap-3 hover:bg-[#1E293B] p-3 rounded-lg cursor-pointer">
            <FaCog />
            <span>Settings</span>
          </div>

          <div className="flex items-center gap-3 hover:bg-[#1E293B] p-3 rounded-lg cursor-pointer">
            <FaSignOutAlt />
            <span>Logout</span>
          </div>

        </div>
      </div>

      {/* Bottom Card */}
      <div className="bg-[#1E293B] p-4 rounded-xl">
        <h2 className="text-lg font-semibold mb-2">
          Keep Practicing 🚀
        </h2>

        <p className="text-sm text-gray-300">
          Success is the result of preparation and hard work.
        </p>
      </div>

    </div>
  );
};

export default Sidebar;