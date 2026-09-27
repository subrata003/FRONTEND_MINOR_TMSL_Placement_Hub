import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./student/pages/Dashboard";
import Profile from "./student/pages/Profile";
import Jobs from "./student/pages/Jobs";
import Applications from "./student/pages/Applications";
import Interviews from "./student/pages/Interviews";
import Results from "./student/pages/Results";
import Sidebar from "./student/components/Sidebar";
import Navbar from "./student/components/Navbar";


function App() {
  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/student/dashboard" replace />}
            />

            <Route path="/student/dashboard" element={<Dashboard />} />

            <Route path="/student/profile" element={<Profile />} />

            <Route path="/student/jobs" element={<Jobs />} />

            {/* <Route path="/student/jobs/:id" element={<JobDetails />} /> */}

            <Route
              path="/student/applications"
              element={<Applications />}
            />

            <Route
              path="/student/interviews"
              element={<Interviews />}
            />

            <Route path="/student/results" element={<Results />} />

            {/* <Route
              path="/student/notifications"
              element={<Notifications />}
            /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;