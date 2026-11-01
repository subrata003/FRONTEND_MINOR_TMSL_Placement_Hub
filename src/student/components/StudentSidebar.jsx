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
  InputBase,
  IconButton,
  Badge,
} from "@mui/material";

import {
  Dashboard,
  Work,
  Assignment,
  Event,
  EmojiEvents,
  Person,
  Logout,
  Search,
  NotificationsNone,
  KeyboardArrowDown,
  School,
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
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >

      {/* ================= SIDEBAR ================= */}

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

        {/* ================= PLACEMENT HUB LOGO ================= */}

        <Box
          sx={{
            height: 100,
            minHeight: 80,
            display: "flex",
            alignItems: "center",
            px: 2.5,
            background: "linear-gradient(120deg, #2563eb, #1d4ed8)",
            color: "#ffffff",
            position: "relative",
            overflow: "hidden",
            isolation: "isolate",
          }}
        >

          {/* Curved Wave Design */}
          <Box
            sx={{
              position: "absolute",
              right: -37,
              top: -40,
              width: 100,
              height: 190,
              borderRadius: "50%",
              background: "#93c5fd",
              opacity: 0.30,
              transform: "rotate(-15deg)",
              zIndex: -1,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              right: -20,
              top: -30,
              width: 75,
              height: 140,
              borderRadius: "50%",
              background: "#ffffff",
              opacity: 0.9,
              transform: "rotate(-15deg)",
              zIndex: -1,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              right: -8,
              top: -30,
              width: 65,
              height: 140,
              borderRadius: "50%",
              background: "#2563eb",
              transform: "rotate(-15deg)",
              zIndex: -1,
            }}
          />

          {/* Graduation Cap Icon */}
          <School
            sx={{
              fontSize: 30,
              mr: 1.5,
              color: "#ffffff",
            }}
          />

          {/* Logo Text */}
          <Typography
            variant="h6"
            fontWeight="800"
            sx={{
              color: "#ffffff",
              fontSize: 20,
              whiteSpace: "nowrap",
              letterSpacing: "-0.5px",
            }}
          >
            Placement Hub
          </Typography>

        </Box>

        {/* ================= STUDENT INFORMATION ================= */}

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

            <Typography variant="body2" color="text.secondary">
              Student
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* ================= MENU ================= */}

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
                    location.pathname === item.path ? 700 : 500,
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ flexGrow: 1 }} />

        {/* ================= LOGOUT ================= */}

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

      {/* ================= MAIN CONTENT ================= */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
        }}
      >

        {/* ================= TOP NAVBAR ================= */}

        <Box
          sx={{
            minHeight: 100,
            background: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
            py: 1.5,
            gap: 2,
            position: "sticky",
            top: 0,
            zIndex: 1100,
          }}
        >

          {/* Student Portal Title */}
          <Box sx={{ minWidth: 180 }}>
            <Typography
              variant="h5"
              fontWeight="800"
              sx={{
                color: "#172554",
                letterSpacing: "-0.5px",
              }}
            >
              Student Portal
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#64748b",
                mt: 0.3,
              }}
            >
              Your Career. Our Priority.
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              background: "#f1f5f9",
              borderRadius: 5,
              px: 2,
              py: 0.8,
              width: "38%",
              maxWidth: 450,

              "&:focus-within": {
                background: "#eff6ff",
                boxShadow: "0 0 0 2px #bfdbfe",
              },
            }}
          >
            <Search sx={{ color: "#64748b", mr: 1 }} />

            <InputBase
              placeholder="Search for jobs, interviews..."
              sx={{
                flex: 1,
                fontSize: 14,
                color: "#334155",
              }}
            />
          </Box>

          {/* Right Navbar Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, md: 2 },
            }}
          >

            {/* Notification Bell */}
            <IconButton
              sx={{
                color: "#475569",
                "&:hover": {
                  background: "#eff6ff",
                },
              }}
            >
              <Badge badgeContent={2} color="error">
                <NotificationsNone />
              </Badge>
            </IconButton>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                mx: 1,
                borderColor: "#cbd5e1",
              }}
            />

            {/* Student Profile */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                cursor: "pointer",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#2563eb",
                  width: 45,
                  height: 45,
                  fontWeight: 600,
                }}
              >
                {loggedUser?.name?.charAt(0)?.toUpperCase() || "S"}
              </Avatar>

              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              >
                <Typography
                  fontWeight="700"
                  fontSize={15}
                  color="#1e293b"
                >
                  {loggedUser?.name || "Student"}
                </Typography>
              </Box>

              <KeyboardArrowDown sx={{ color: "#64748b" }} />
            </Box>

          </Box>
        </Box>

        {/* ================= PAGE CONTENT ================= */}

        <Box sx={{ p: 4 }}>
          <Outlet />
        </Box>

      </Box>
    </Box>
  );
};

export default StudentLayout;
