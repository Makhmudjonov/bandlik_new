import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api/axios"; // <-- shu yerda sizning axios instance chaqiriladi

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // axios instance orqali so‘rov yuboriladi
      const response = await api.post("/login/", {
        username,
        password,
      });

      const { access, refresh } = response.data;

      // Tokenlarni localStorage ga saqlash
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Dashboard sahifasiga yo‘naltirish
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login muvaffaqiyatsiz. Username yoki parol xato.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-800">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-[1.02]">
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <img
          src="https://tashmeduni.uz/web/wp-content/uploads/2025/08/tsmu_logo_200.png"
          alt="TDTU Logo"
          className="w-20 h-20 mb-3 drop-shadow-lg"
        />
        <h3
          className="text-2xl font-bold"
          style={{ color: "#0056A4" }} // 🔹 Logodagi ko‘k rang
        >
          Toshkent davlat tibbiyot universiteti karera markazi
        </h3>
      </div>


        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Username kiriting"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Parol
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Parol kiriting"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            Kirish
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Hisobingiz yo‘qmi?{" "}
          <Link to="" className="text-indigo-600 hover:underline">
            Ro‘yxatdan o‘tish
          </Link>
        </p>
      </div>
    </div>
  );
}
