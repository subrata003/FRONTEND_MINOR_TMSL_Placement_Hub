import {
  Dashboard,
  Person,
  BusinessCenter,
  Assignment,
  Event,
  EmojiEvents,
  Notifications,
  School,
  Close,
} from "@mui/icons-material";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: <Dashboard />,
    path: "/student/dashboard",
  },
  {
    name: "My Profile",
    icon: <Person />,
    path: "/student/profile",
  },
  {
    name: "Jobs & Drives",
    icon: <BusinessCenter />,
    path: "/student/jobs",
  },
  {
    name: "Applications",
    icon: <Assignment />,
    path: "/student/applications",
  },
  {
    name: "Interviews",
    icon: <Event />,
    path: "/student/interviews",
  },
  {
    name: "Results",
    icon: <EmojiEvents />,
    path: "/student/results",
  },
  {
    name: "Notifications",
    icon: <Notifications />,
    path: "/student/notifications",
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 350,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
          background: "#111827",
          color: "white",
          borderRight: "none",
        },
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: 75,
          display: "flex",
          alignItems: "center",
          px: 3,
          gap: 1.5,
        }}
      >
        <School sx={{ fontSize: 32, color: "#60a5fa" }} />

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "#60a5fa" }}
        >
          Placement Hub
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "#374151" }} />

      {/* Menu */}
      <List sx={{ px: 1.5, mt: 2 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.name}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 0.7,
                color: active ? "white" : "#9ca3af",
                backgroundColor: active ? "#2563eb" : "transparent",

                "&:hover": {
                  backgroundColor: active ? "#2563eb" : "#1f2937",
                  color: "white",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: active ? "white" : "#9ca3af",
                  minWidth: 42,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* Student info */}
      <Box
        sx={{
          marginTop: "auto",
          p: 2,
          borderTop: "1px solid #374151",
        }}
      >
        <Typography fontSize={12} color="#9ca3af">
          Logged in as
        </Typography>

        <Typography fontWeight="bold">
          Student
        </Typography>
      </Box>
    </Drawer>
  );
}

export default Sidebar;