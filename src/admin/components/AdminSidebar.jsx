import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";

import {
  Dashboard,
  People,
  Work,
  Assignment,
  School,
  Logout,
} from "@mui/icons-material";

import { Outlet, useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser")
  );


  

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <Dashboard />,
    },
    {
      name: "Manage Students",
      path: "/admin/students",
      icon: <People />,
    },
    {
      name: "Job Management",
      path: "/admin/jobs",
      icon: <Work />,
    },
    {
      name: "Application Management",
      path: "/admin/applications",
      icon: <Assignment />,
    },
    {
      name: "Placement Management",
      path: "/admin/placements",
      icon: <School />,
    },
  ];

  const logout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      {/* ================= SIDEBAR ================= */}
      <Box
        sx={{
          width: 250,
          background: "#ffffff",
          borderRight: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            p: 2,
            background: "#2563eb",
            color: "white",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="700"
          >
            Placement Hub
          </Typography>

          <Typography
            variant="body2"
            sx={{ opacity: 0.8 }}
          >
            Admin Panel
          </Typography>
        </Box>

        {/* Admin Info */}
        <Box sx={{ p: 2 }}>
          <Typography fontWeight="600">
            {loggedUser?.name || "Admin"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {loggedUser?.email}
          </Typography>
        </Box>

        <Divider />

        {/* Menu */}
        <List sx={{ p: 1 }}>
          {menuItems.map((item) => {
            const active =
              location.pathname === item.path;

            return (
              <ListItemButton
                key={item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  color: active
                    ? "#2563eb"
                    : "#475569",
                  background: active
                    ? "#eff6ff"
                    : "transparent",

                  "&:hover": {
                    background: "#eff6ff",
                    color: "#2563eb",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: active
                      ? "#2563eb"
                      : "#64748b",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.name}
                />
              </ListItemButton>
            );
          })}
        </List>

        <Box sx={{ mt: "auto", p: 2 }}>
          <Button
            fullWidth
            startIcon={<Logout />}
            onClick={logout}
            sx={{
              justifyContent: "flex-start",
              color: "#dc2626",
              "&:hover": {
                background: "#fef2f2",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* ================= MAIN CONTENT ================= */}
      <Box
        sx={{
          flex: 1,
          ml: "250px",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminSidebar;