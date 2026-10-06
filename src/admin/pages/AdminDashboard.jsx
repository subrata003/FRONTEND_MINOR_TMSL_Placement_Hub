import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { admin, students } from "../../../public/data/User";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser")
  );

  const logout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/");
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#f5f7fb" }}>
      <Box
        sx={{
          background: "#2563eb",
          color: "white",
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight="700">
          Placement Hub - Admin
        </Typography>

        <Button
          variant="contained"
          onClick={logout}
          sx={{
            background: "white",
            color: "#2563eb",
            "&:hover": {
              background: "#f1f5f9",
            },
          }}
        >
          Logout
        </Button>
      </Box>

      <Box sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="700">
          Welcome, {loggedUser?.name}
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Admin Dashboard
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 3,
            mt: 4,
          }}
        >
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Total Students
              </Typography>

              <Typography variant="h3" fontWeight="700">
                {students.length}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Admin
              </Typography>

              <Typography variant="h5" fontWeight="700">
                {admin.name}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="700" mb={2}>
              Registered Students
            </Typography>

            {students.map((student) => (
              <Box
                key={student.id}
                sx={{
                  p: 2,
                  mb: 1,
                  borderRadius: 2,
                  background: "#f8fafc",
                }}
              >
                <Typography fontWeight="600">
                  {student.name}
                </Typography>

                <Typography color="text.secondary">
                  {student.email}
                </Typography>

                <Typography
                  sx={{
                    color: "#2563eb",
                    fontSize: 14,
                    textTransform: "capitalize",
                  }}
                >
                  {student.role}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
