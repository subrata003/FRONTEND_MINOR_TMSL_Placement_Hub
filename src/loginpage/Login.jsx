import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
} from "@mui/material";

import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  School,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { admin, students } from "../../public/data/User.js";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    // Admin login
    if (
      email.toLowerCase() === admin.email.toLowerCase() &&
      password === admin.password
    ) {
      localStorage.setItem(
        "loggedUser",
        JSON.stringify(admin)
      );

      navigate("/admin/dashboard");
      return;
    }

    // Student login
    const student = students.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (student) {
      localStorage.setItem(
        "loggedUser",
        JSON.stringify(student)
      );

      navigate("/student/dashboard");
      return;
    }

    setError("Invalid email or password");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 430,
          borderRadius: 4,
          boxShadow: "0 15px 40px rgba(0,0,0,0.10)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 65,
                height: 65,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#2563eb",
                color: "white",
              }}
            >
              <School sx={{ fontSize: 38 }} />
            </Box>
          </Box>

          <Typography
            variant="h4"
            fontWeight="700"
            textAlign="center"
          >
            Placement Hub
          </Typography>

          <Typography
            color="text.secondary"
            textAlign="center"
            sx={{ mt: 1, mb: 3 }}
          >
            Login to your account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 2,
                textTransform: "none",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Login
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography textAlign="center" color="text.secondary">
            Don't have an account?
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate("/register")}
            sx={{
              mt: 1,
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Create Student Account
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;