import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Dashboard from "./pages/dashboard/Dashboard";
import Students from "./pages/students/Students";
import CompaniesDashboard from "./pages/workers/Workers";
import "./styles/layout.css";

function App() {
  return (
    <Router>
      {/* Umumiy flex layout */}
      <div className="flex h-screen bg-gray-100">
        {/* Chap tomonda Sidebar */}
        <Sidebar />

        {/* O‘ng tomonda Header + Asosiy kontent */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header yuqorida */}
          <Header />

          {/* Page kontent pastda */}
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/workers" element={<CompaniesDashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
