import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Students from "./pages/students/Students";
import CompaniesDashboard from "./pages/workers/Workers";
import LoginPage from "./pages/auth/login/login";
import ProtectedRoute from "./api/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth sahifa */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="flex h-screen bg-gray-50 overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-y-auto p-6">
                    <Dashboard />
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <div className="flex h-screen bg-gray-50 overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-y-auto p-6">
                    <Students />
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/workers"
          element={
            <ProtectedRoute>
              <div className="flex h-screen bg-gray-50 overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-y-auto p-6">
                    <CompaniesDashboard />
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
