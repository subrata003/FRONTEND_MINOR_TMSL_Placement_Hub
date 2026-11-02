// import { useState } from "react";

// import {
//   Box,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Typography,
//   MenuItem,
//   Alert,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";

// import {
//   Person,
//   Email,
//   Lock,
//   Visibility,
//   VisibilityOff,
//   School,
// } from "@mui/icons-material";

// import { useNavigate } from "react-router-dom";
// import { addStudent } from '../../public/data/User';
// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "student",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] =
//     useState(false);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");

//     if (
//       !formData.name ||
//       !formData.email ||
//       !formData.password ||
//       !formData.confirmPassword
//     ) {
//       setError("Please fill all fields");
//       return;
//     }

//     if (formData.password.length < 8) {
//       setError("Password must contain at least 8 characters");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     addStudent({
//       name: formData.name,
//       email: formData.email,
//       role: "student",
//       password: formData.password,
//     });

//     setSuccess(
//       "Registration successful. You can now login."
//     );

//     setTimeout(() => {
//       navigate("/");
//     }, 1500);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background:
//           "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)",
//         px: 2,
//         py: 4,
//       }}
//     >
//       <Card
//         sx={{
//           width: "100%",
//           maxWidth: 480,
//           borderRadius: 4,
//           boxShadow: "0 15px 40px rgba(0,0,0,0.10)",
//         }}
//       >
//         <CardContent sx={{ p: 4 }}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               mb: 2,
//             }}
//           >
//             <Box
//               sx={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: 3,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 background: "#2563eb",
//                 color: "white",
//               }}
//             >
//               <School sx={{ fontSize: 35 }} />
//             </Box>
//           </Box>

//           <Typography
//             variant="h4"
//             fontWeight="700"
//             textAlign="center"
//           >
//             Student Registration
//           </Typography>

//           <Typography
//             textAlign="center"
//             color="text.secondary"
//             sx={{ mt: 1, mb: 3 }}
//           >
//             Create your Placement Hub account
//           </Typography>

//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}

//           {success && (
//             <Alert severity="success" sx={{ mb: 2 }}>
//               {success}
//             </Alert>
//           )}

//           <Box component="form" onSubmit={handleRegister}>
//             <TextField
//               fullWidth
//               label="Full Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               margin="normal"
//               required
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Person />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <TextField
//               fullWidth
//               label="Email Address"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               margin="normal"
//               required
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Email />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* Role */}
//             <TextField
//               fullWidth
//               select
//               label="Role"
//               name="role"
//               value="student"
//               margin="normal"
//               disabled
//             >
//               <MenuItem value="student">
//                 Student
//               </MenuItem>
//             </TextField>

//             <TextField
//               fullWidth
//               label="Password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               value={formData.password}
//               onChange={handleChange}
//               margin="normal"
//               required
//               helperText="Minimum 8 characters"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Lock />
//                   </InputAdornment>
//                 ),
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={() =>
//                         setShowPassword(!showPassword)
//                       }
//                     >
//                       {showPassword ? (
//                         <VisibilityOff />
//                       ) : (
//                         <Visibility />
//                       )}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <TextField
//               fullWidth
//               label="Confirm Password"
//               name="confirmPassword"
//               type={
//                 showConfirmPassword ? "text" : "password"
//               }
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               margin="normal"
//               required
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Lock />
//                   </InputAdornment>
//                 ),
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={() =>
//                         setShowConfirmPassword(
//                           !showConfirmPassword
//                         )
//                       }
//                     >
//                       {showConfirmPassword ? (
//                         <VisibilityOff />
//                       ) : (
//                         <Visibility />
//                       )}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               size="large"
//               sx={{
//                 mt: 3,
//                 py: 1.4,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 fontWeight: 600,
//               }}
//             >
//               Register
//             </Button>

//             <Button
//               fullWidth
//               onClick={() => navigate("/")}
//               sx={{
//                 mt: 1,
//                 textTransform: "none",
//               }}
//             >
//               Already have an account? Login
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default Register;

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleRegister = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (
    !formData.name.trim() ||
    !formData.email.trim() ||
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

  const registerData = {
    name: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),
    role: "student",
    password: formData.password,
  };

  try {
    setLoading(true);

    console.log("Sending Registration Data:", registerData);

    const response = await fetch(
      "http://localhost:8080/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(registerData),
      }
    );

    // Read response safely
    const responseText = await response.text();

    let data = {};

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error(
        "Backend returned an invalid response: " + responseText
      );
    }

    console.log("API Status:", response.status);
    console.log("API Response:", data);

    if (!response.ok) {
      throw new Error(
        data.message ||
        data.error ||
        `Registration failed. HTTP ${response.status}`
      );
    }

    setSuccess(
      data.message || "Registration successful!"
    );

    setFormData({
      name: "",
      email: "",
      role: "student",
      password: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      navigate("/");
    }, 1500);

  } catch (error) {
    console.error("Registration Error:", error);

    setError(
      error.message.includes("Failed to fetch")
        ? "Cannot connect to backend. Check your server and CORS settings."
        : error.message
    );

  } finally {
    setLoading(false);
  }
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
                      type="button"
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
                      type="button"
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
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {loading ? "Registering..." : "Register"}
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

// import { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Typography,
//   MenuItem,
//   Alert,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";

// import {
//   Person,
//   Email,
//   Lock,
//   Visibility,
//   VisibilityOff,
//   School,
//   Badge,
// } from "@mui/icons-material";

// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     rollNumber: "",
//     email: "",
//     role: "student",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] =
//     useState(false);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Roll number accepts digits only
//     if (name === "rollNumber" && !/^\d*$/.test(value)) {
//       return;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Registration handler
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");

//     // Required field validation
//     if (
//       !formData.name.trim() ||
//       !formData.rollNumber.trim() ||
//       !formData.email.trim() ||
//       !formData.password ||
//       !formData.confirmPassword
//     ) {
//       setError("Please fill all fields");
//       return;
//     }

//     // Roll number validation
//     if (!/^\d+$/.test(formData.rollNumber)) {
//       setError("Roll number must contain numbers only");
//       return;
//     }

//     // Email validation
//     if (
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
//     ) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     // Password validation
//     if (formData.password.length < 8) {
//       setError("Password must contain at least 8 characters");
//       return;
//     }

//     // Confirm password validation
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     const registerData = {
//       name: formData.name.trim(),
//       rollNumber: formData.rollNumber.trim(),
//       email: formData.email.trim().toLowerCase(),
//       role: "student",
//       password: formData.password,
//     };

//     try {
//       setLoading(true);

//       console.log("Sending Registration Data:", {
//         ...registerData,
//         password: "[HIDDEN]",
//       });

//       const response = await fetch(
//         "http://localhost:8080/api/auth/register",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//           body: JSON.stringify(registerData),
//         }
//       );

//       const responseText = await response.text();

//       let data = {};

//       try {
//         data = responseText ? JSON.parse(responseText) : {};
//       } catch {
//         throw new Error(
//           "Backend returned an invalid response"
//         );
//       }

//       console.log("API Status:", response.status);
//       console.log("API Response:", data);

//       if (!response.ok) {
//         throw new Error(
//           data.message ||
//           data.error ||
//           `Registration failed. HTTP ${response.status}`
          
//         );
        
        
//       }

//       setSuccess(
//         data.message || "Registration successful!"
//       );

//       // Reset form
//       setFormData({
//         name: "",
//         rollNumber: "",
//         email: "",
//         role: "student",
//         password: "",
//         confirmPassword: "",
//       });

//       // Navigate to login
//       setTimeout(() => {
//         navigate("/");
//       }, 1500);

//     } catch (error) {
//       console.error("Registration Error:", error);

//       setError(
//         error.message.includes("Failed to fetch")
//           ? "Cannot connect to backend. Check your server and CORS settings."
//           : error.message
//       );

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background:
//           "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)",
//         px: 2,
//         py: 4,
//       }}
//     >
//       <Card
//         sx={{
//           width: "100%",
//           maxWidth: 480,
//           borderRadius: 4,
//           boxShadow: "0 15px 40px rgba(0,0,0,0.10)",
//         }}
//       >
//         <CardContent sx={{ p: 4 }}>

//           {/* Logo */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               mb: 2,
//             }}
//           >
//             <Box
//               sx={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: 3,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 background: "#2563eb",
//                 color: "white",
//               }}
//             >
//               <School sx={{ fontSize: 35 }} />
//             </Box>
//           </Box>

//           {/* Heading */}
//           <Typography
//             variant="h4"
//             fontWeight="700"
//             textAlign="center"
//           >
//             Student Registration
//           </Typography>

//           <Typography
//             textAlign="center"
//             color="text.secondary"
//             sx={{ mt: 1, mb: 3 }}
//           >
//             Create your Placement Hub account
//           </Typography>

//           {/* Messages */}
//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}

//           {success && (
//             <Alert severity="success" sx={{ mb: 2 }}>
//               {success}
//             </Alert>
//           )}

//           {/* Registration Form */}
//           <Box component="form" onSubmit={handleRegister}>

//             {/* Full Name */}
//             <TextField
//               fullWidth
//               label="Full Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               margin="normal"
//               required
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Person />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* Roll Number */}
//             <TextField
//               fullWidth
//               label="Roll Number"
//               name="rollNumber"
//               type="text"
//               value={formData.rollNumber}
//               onChange={handleChange}
//               margin="normal"
//               required
//               inputProps={{
//                 inputMode: "numeric",
//                 pattern: "[0-9]*",
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Badge />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* Email */}
//             <TextField
//               fullWidth
//               label="Email Address"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               margin="normal"
//               required
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Email />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* Role */}
//             <TextField
//               fullWidth
//               select
//               label="Role"
//               value="student"
//               margin="normal"
//               disabled
//             >
//               <MenuItem value="student">
//                 Student
//               </MenuItem>
//             </TextField>

//             {/* Password */}
//             <TextField
//               fullWidth
//               label="Password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               value={formData.password}
//               onChange={handleChange}
//               margin="normal"
//               required
//               helperText="Minimum 8 characters"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Lock />
//                   </InputAdornment>
//                 ),
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       type="button"
//                       onClick={() =>
//                         setShowPassword((prev) => !prev)
//                       }
//                     >
//                       {showPassword ? (
//                         <VisibilityOff />
//                       ) : (
//                         <Visibility />
//                       )}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* Confirm Password */}
//             <TextField
//               fullWidth
//               label="Confirm Password"
//               name="confirmPassword"
//               type={
//                 showConfirmPassword ? "text" : "password"
//               }
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               margin="normal"
//               required
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Lock />
//                   </InputAdornment>
//                 ),
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       type="button"
//                       onClick={() =>
//                         setShowConfirmPassword((prev) => !prev)
//                       }
//                     >
//                       {showConfirmPassword ? (
//                         <VisibilityOff />
//                       ) : (
//                         <Visibility />
//                       )}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* Register Button */}
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               size="large"
//               disabled={loading}
//               sx={{
//                 mt: 3,
//                 py: 1.4,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 fontWeight: 600,
//               }}
//             >
//               {loading ? "Registering..." : "Register"}
//             </Button>

//             {/* Login Button */}
//             <Button
//               fullWidth
//               onClick={() => navigate("/")}
//               sx={{
//                 mt: 1,
//                 textTransform: "none",
//               }}
//             >
//               Already have an account? Login
//             </Button>

//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default Register;
