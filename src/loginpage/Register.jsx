import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  MenuItem,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";

import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  School,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { addStudent } from '../../public/data/User';
const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill all fields");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    addStudent({
      name: formData.name,
      email: formData.email,
      role: "student",
      password: formData.password,
    });

    setSuccess(
      "Registration successful. You can now login."
    );

    setTimeout(() => {
      navigate("/");
    }, 1500);
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
        py: 4,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 4,
          boxShadow: "0 15px 40px rgba(0,0,0,0.10)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#2563eb",
                color: "white",
              }}
            >
              <School sx={{ fontSize: 35 }} />
            </Box>
          </Box>

          <Typography
            variant="h4"
            fontWeight="700"
            textAlign="center"
          >
            Student Registration
          </Typography>

          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ mt: 1, mb: 3 }}
          >
            Create your Placement Hub account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
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

            {/* Role */}
            <TextField
              fullWidth
              select
              label="Role"
              name="role"
              value="student"
              margin="normal"
              disabled
            >
              <MenuItem value="student">
                Student
              </MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              helperText="Minimum 8 characters"
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

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={
                showConfirmPassword ? "text" : "password"
              }
              value={formData.confirmPassword}
              onChange={handleChange}
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
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? (
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
                fontWeight: 600,
              }}
            >
              Register
            </Button>

            <Button
              fullWidth
              onClick={() => navigate("/")}
              sx={{
                mt: 1,
                textTransform: "none",
              }}
            >
              Already have an account? Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;