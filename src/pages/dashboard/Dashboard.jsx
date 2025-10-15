import React, { useState, useEffect } from "react";
import { Users, BookOpen, FileText, Award } from "lucide-react";
import CountUp from "react-countup";
import axios from "axios";
import EmploymentChart from "./chart/EmploymentChart.jsx";
import DonutChart from "./chart/DonutChart.jsx";
import api from "../../api/axios.js";

function Dashboard() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Token avtomatik qo‘shiladi
        const res = await api.get("/stats/students/");
        setApiData(res.data);
      } catch (err) {
        console.error("API fetch error:", err);
        setError("Ma'lumotlarni yuklab bo‘lmadi");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !apiData) {
    return <div className="text-center text-red-500 p-6">{error || "Xato ma'lumot"}</div>;
  }

  // Fallback qiymatlar
  const totalStudents = Number(apiData?.total_students ?? 0);
  const graduates = Number(apiData?.graduate_stats?.graduates ?? 0);
  const employed = Number(apiData?.graduate_stats?.employed ?? 0);
  const nonGraduates = Number(apiData?.graduate_stats?.non_graduates ?? 0);
  const genderStats = apiData?.gender_stats ?? [];
  const ageGroups = apiData?.age_groups ?? [];
  const recentStudents = apiData?.recent_students ?? [];

  return (
    <div className="p-4 space-y-6">
      {/* Statistik kartalar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Umumiy talabalar */}
        <div className="bg-blue-500 text-white rounded-xl p-6 flex items-center gap-4 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
          <Users size={36} />
          <div>
            <h3 className="text-2xl font-bold">
              <CountUp key={totalStudents} start={0} end={totalStudents} duration={3} separator="," />
            </h3>
            <p>Talabalarning umumiy soni</p>
          </div>
        </div>

        {/* Bitiruvchilar */}
        <div className="bg-green-500 text-white rounded-xl p-6 flex items-center gap-4 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
          <BookOpen size={36} />
          <div>
            <h3 className="text-2xl font-bold">
              <CountUp key={graduates} start={0} end={graduates} duration={3} separator="," />
            </h3>
            <p>Bitiruvchilar</p>
          </div>
        </div>

        {/* Ishli talabalar */}
        <div className="bg-purple-500 text-white rounded-xl p-6 flex items-center gap-4 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
          <FileText size={36} />
          <div className="w-full">
            <h3 className="text-2xl font-bold">
              <CountUp key={employed} start={0} end={employed} duration={3} separator="," />
            </h3>
            <p>Ishga qabul qilingan talabalar</p>
            <div className="w-full bg-white h-2 rounded mt-2">
              <div
                className="bg-blue-600 h-2 rounded transition-all duration-1000"
                style={{
                  width: `${totalStudents > 0 ? (employed / totalStudents) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Ishsiz talabalar */}
        <div className="bg-red-500 text-white rounded-xl p-6 flex items-center gap-4 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
          <Award size={36} />
          <div>
            <h3 className="text-2xl font-bold">
              <CountUp key={nonGraduates} start={0} end={nonGraduates} duration={3} separator="," />
            </h3>
            <p>Ishsiz talabalar</p>
          </div>
        </div>
      </div>

      {/* Diagrammalar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col justify-center items-center h-96">
          <h3 className="text-lg font-semibold mb-4 text-center">Ishli / Ishsiz nisbati</h3>
          <EmploymentChart data={apiData.graduate_stats} className="w-full h-full" />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col lg:flex-row justify-evenly items-center gap-6 h-96">
          <div className="flex-1 flex flex-col items-center justify-center h-full">
            <h4 className="mb-2 font-medium">Jins bo‘yicha</h4>
            <DonutChart data={genderStats} type="gender" className="w-full h-full" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center h-full">
            <h4 className="mb-2 font-medium">Yosh toifasi bo‘yicha</h4>
            <DonutChart data={ageGroups} type="age" className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* So‘nggi talabalar jadvali */}
      <div className="bg-white rounded-xl p-6 shadow-lg overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">So‘nggi qo‘shilgan talabalar</h3>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">F.I.SH.</th>
              <th className="px-4 py-2">Mutaxassislik</th>
              <th className="px-4 py-2">Viloyat</th>
              <th className="px-4 py-2">Tuman</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Ish holati</th>
              <th className="px-4 py-2">Sana</th>
            </tr>
          </thead>
          <tbody>
            {recentStudents.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-4 py-2">{s.id}</td>
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.field}</td>
                <td className="px-4 py-2">{s.province}</td>
                <td className="px-4 py-2">{s.district}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      s.status === "Ishli"
                        ? "bg-green-500"
                        : s.status === "Ishsiz"
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-2">{s.employment_status || "-"}</td>
                <td className="px-4 py-2">{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
