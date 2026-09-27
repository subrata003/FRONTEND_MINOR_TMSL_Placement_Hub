import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
} from "@mui/material";

import { Notifications } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    

    
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "white",
        color: "#111827",
        borderBottom: "1px solid #e5e7eb",
        display:"flex",
        alignContent:"center",
        
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" ,gap:'10px'  }}>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Student Portal
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Manage your placement journey
          </Typography>
        </Box>

        <Box sx={{display:"flex" ,alignItems:"center",  gap:"30px" }}>
          <IconButton
            onClick={() => navigate("/student/notifications")}
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <Avatar
            sx={{
              width: 38,
              height: 38,
              bgcolor: "#2563eb",
            }}
          >
            S
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
    
  );
}

export default Navbar;