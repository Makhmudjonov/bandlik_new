import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, User, LogOut, UserCircle } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sahifa nomini aniqlash
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/students":
        return "Talabalar";
      case "/workers":
        return "Ish Beruvchilar";
      default:
        return "";
    }
  };

  // Tashqariga bosilganda dropdown yopilishi
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout funksiyasi
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-indigo-800 p-4 shadow-lg rounded-br-xl">
      {/* Sahifa nomi */}
      <h1 className="text-xl font-bold text-white">{getPageTitle()}</h1>

      {/* O‘ng tomonda bildirishnoma va foydalanuvchi */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <button className="relative">
          <Bell className="w-6 h-6 text-white hover:text-yellow-300 transition-all duration-200" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Foydalanuvchi menyusi */}
        <div
          className="flex items-center gap-2 cursor-pointer group p-2 rounded-full hover:bg-indigo-700 transition-all duration-200"
          onClick={() => setOpen(!open)}
        >
          <User className="w-6 h-6 text-white group-hover:text-yellow-300 transition-all duration-200 group-hover:scale-110" />
          <span className="text-white font-medium group-hover:text-yellow-300 transition-colors duration-200">
            Admin
          </span>
        </div>

        {/* Dropdown menyu */}
        {open && (
          <div className="absolute right-0 top-14 w-48 bg-white rounded-xl shadow-lg border border-indigo-100 py-2 z-50 animate-fadeIn">
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
            >
              <UserCircle size={18} /> Profil
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <LogOut size={18} /> Chiqish
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
