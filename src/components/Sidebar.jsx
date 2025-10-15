import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Briefcase } from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Asboblar paneli", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Talabalar", path: "/students", icon: <Users size={18} /> },
    { name: "Ish beruvchilar", path: "/workers", icon: <Briefcase size={18} /> },
  ];

  return (
    <div className="h-screen w-64 flex-shrink-0 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white shadow-lg flex flex-col p-5">
      {/* Logo va nom */}
      <div className="flex flex-col items-center mb-8 border-b border-indigo-400 pb-4">
        <img
          src="https://tashmeduni.uz/web/wp-content/uploads/2025/08/tsmu_logo_200.png"
          alt="TDTU Logo"
          className="w-16 h-16 mb-2"
        />
        <span className="text-lg font-bold text-center">Karera TDTU</span>
      </div>

      {/* Menu */}
      <ul className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white text-indigo-700 shadow-md"
                    : "hover:bg-indigo-500 hover:text-white"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="text-xs text-center text-indigo-200 mt-auto border-t border-indigo-500 pt-4">
        &copy; {new Date().getFullYear()} Bandlik tizimi
      </div>
    </div>
  );
}

export default Sidebar;
