import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  Button,
} from "@mui/material";

import {
  Dashboard,
  Work,
  Assignment,
  Event,
  EmojiEvents,
  Person,
  Logout,
} from "@mui/icons-material";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 250;

const StudentLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser")
  );

  const menuItems = [
    {
      title: "Dashboard",
      icon: <Dashboard />,
      path: "/student/pages/dashboard",
    },
    {
      title: "Jobs",
      icon: <Work />,
      path: "/student/jobs",
    },
    {
      title: "Applications",
      icon: <Assignment />,
      path: "/student/applications",
    },
    {
      title: "Interviews",
      icon: <Event />,
      path: "/student/interviews",
    },
    {
      title: "Results",
      icon: <EmojiEvents />,
      path: "/student/results",
    },
    {
      title: "Profile",
      icon: <Person />,
      path: "/student/profile",
    },
  ];

  const logout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f5f7fb" }}>
      
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #e5e7eb",
            background: "#ffffff",
          },
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            height: 80,
            display: "flex",
            alignItems: "center",
            px: 3,
            background: "#2563eb",
            color: "white",
          }}
        >
          <Typography variant="h5" fontWeight="700">
            Placement Hub
          </Typography>
        </Box>

        {/* Student Information */}
        <Box
          sx={{
            p: 2.5,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#2563eb",
              width: 45,
              height: 45,
            }}
          >
            {loggedUser?.name?.charAt(0)?.toUpperCase() || "S"}
          </Avatar>

          <Box>
            <Typography fontWeight="700">
              {loggedUser?.name || "Student"}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Student
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* Menu */}
        <List sx={{ px: 1.5, py: 2 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                mb: 0.8,
                py: 1.3,

                "&.Mui-selected": {
                  background: "#dbeafe",
                  color: "#2563eb",
                },

                "&.Mui-selected:hover": {
                  background: "#dbeafe",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 42,
                  color:
                    location.pathname === item.path
                      ? "#2563eb"
                      : "#64748b",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontWeight:
                    location.pathname === item.path
                      ? 700
                      : 500,
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ flexGrow: 1 }} />

        {/* Logout */}
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Logout />}
            onClick={logout}
            sx={{
              color: "#dc2626",
              borderColor: "#fecaca",
              textTransform: "none",
              borderRadius: 2,

              "&:hover": {
                background: "#fef2f2",
                borderColor: "#dc2626",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        {/* Top Header */}
        <Box
          sx={{
            height: 80,
            background: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 4,
          }}
        >
          <Typography variant="h6" fontWeight="700">
            Student Portal
          </Typography>

          <Typography color="text.secondary">
            Welcome, {loggedUser?.name || "Student"}
          </Typography>
        </Box>

        {/* Page */}
        <Box sx={{ p: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default StudentLayout;
