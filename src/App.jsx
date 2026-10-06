// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // Login / Register
// import Login from "./loginpage/Login";
// import Register from "./loginpage/Register";

// // Admin
// import AdminDashboard from "./admin/components/AdminDashboard";

// // Student Layout
// import StudentSidebar from "./student/components/StudentSidebar";

// // Student Pages
// import Dashboard from "./student/pages/Dashboard";
// import Jobs from "./student/pages/Jobs";
// import Applications from "./student/pages/Applications";
// import Interviews from "./student/pages/Interviews";
// import Results from "./student/pages/Results";
// import Profile from "./student/pages/Profile";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* ================= LOGIN ================= */}
//         <Route path="/" element={<Login />} />

//         {/* ================= REGISTER ================= */}
//         <Route path="/register" element={<Register />} />

//         {/* ================= ADMIN ================= */}
//         <Route
//           path="/admin/dashboard"
//           element={<AdminDashboard />}
//         />

//         {/* ================= STUDENT ================= */}
//         <Route path="/student" element={<StudentSidebar />}>

//           {/* Student Dashboard */}
//           <Route
//             path="dashboard"
//             element={<Dashboard />}
//           />

//           {/* Jobs */}
//           <Route
//             path="jobs"
//             element={<Jobs />}
//           />

//           {/* Applications */}
//           <Route
//             path="applications"
//             element={<Applications />}
//           />

//           {/* Interviews */}
//           <Route
//             path="interviews"
//             element={<Interviews />}
//           />

//           {/* Results */}
//           <Route
//             path="results"
//             element={<Results />}
//           />

//           {/* Profile */}
//           <Route
//             path="profile"
//             element={<Profile />}
//           />

//         </Route>

//         {/* Default student route */}
//         <Route
//           path="/student/*"
//           element={<Navigate to="/student/dashboard" replace />}
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Login / Register
import Login from "./loginpage/Login";
import Register from "./loginpage/Register";

// Admin
import AdminSidebar from './admin/components/AdminSidebar'
import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageStudents from "./admin/pages/ManageStudents";
import JobManagement from "./admin/pages/JobManagement";
import ApplicationManagement from "./admin/pages/ApplicationManagement";
import PlacementManagement from "./admin/pages/PlacementManagement";

// Student Layout
import StudentSidebar from "./student/components/StudentSidebar";

// Student Pages
import Dashboard from "./student/pages/Dashboard";
import Jobs from "./student/pages/Jobs";
import Applications from "./student/pages/Applications";
import Interviews from "./student/pages/Interviews";
import Results from "./student/pages/Results";
import Profile from "./student/pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= LOGIN ================= */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* ================= REGISTER ================= */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={<AdminSidebar />}
        >
          <Route
            index
            element={
              <Navigate
                to="/admin/dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="students"
            element={<ManageStudents />}
          />

          <Route
            path="jobs"
            element={<JobManagement />}
          />

          <Route
            path="applications"
            element={<ApplicationManagement />}
          />

          <Route
            path="placements"
            element={<PlacementManagement />}
          /> 
        </Route> 

        {/* ================= STUDENT ================= */}
        <Route 
          path="/student"
          element={<StudentSidebar />}
        >
          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="jobs"
            element={<Jobs />}
          />

          <Route
            path="applications"
            element={<Applications />}
          />

          <Route
            path="interviews"
            element={<Interviews />}
          />

          <Route
            path="results"
            element={<Results />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />
        </Route>

        {/* ================= DEFAULT ================= */}
        <Route
          path="/student/*"
          element={
            <Navigate
              to="/student/dashboard"
              replace
            />
          }
        />

        <Route
          path="/admin/*"
          element={
            <Navigate
              to="/admin/dashboard"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;