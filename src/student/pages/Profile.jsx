// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Avatar,
// } from "@mui/material";

// function Profile() {
//   return (
//     <Box>
//       <Typography variant="h4" fontWeight="bold" mb={1}>
//         My Profile
//       </Typography>

//       <Typography color="text.secondary" mb={3}>
//         Manage your personal, academic and professional information.
//       </Typography>

//       <Card sx={{ borderRadius: 3 }}>
//         <CardContent sx={{ p: 4 }}>
//           <Box
//             display="flex"
//             alignItems="center"
//             gap={2}
//             mb={4}
//           >
//             <Avatar
//               sx={{
//                 width: 75,
//                 height: 75,
//                 bgcolor: "#2563eb",
//                 fontSize: 28,
//               }}
//             >
//               S
//             </Avatar>

//             <Box>
//               <Typography variant="h6" fontWeight="bold">
//                 Sourav Ghosh
//               </Typography>

//               <Typography color="text.secondary">
//                 MCA Student
//               </Typography>
//             </Box>
//           </Box>

//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Full Name"
//                 defaultValue="Sourav Ghosh"
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 defaultValue="sourav@example.com"
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Phone"
//                 defaultValue="+91 XXXXX XXXXX"
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Course"
//                 defaultValue="MCA"
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="College"
//                 defaultValue="Techno Main Salt Lake"
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="CGPA"
//                 defaultValue="7.70"
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Skills"
//                 defaultValue="React, JavaScript, Node.js, Express.js, MongoDB, Java"
//               />
//             </Grid>
//           </Grid>

//           <Box mt={4}>
//             <Button variant="contained">
//               Save Changes
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>

//       <Card sx={{ borderRadius: 3, mt: 3 }}>
//         <CardContent>
//           <Typography variant="h6" fontWeight="bold">
//             Resume
//           </Typography>

//           <Typography
//             color="text.secondary"
//             mt={1}
//             mb={2}
//           >
//             Upload your latest resume.
//           </Typography>

//           <Button variant="outlined" component="label">
//             Upload Resume
//             <input hidden type="file" accept=".pdf,.doc,.docx" />
//           </Button>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

// export default Profile;
import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Divider,
  Stack,
  Chip,
} from "@mui/material";

import {
  Edit,
  Email,
  Phone,
  School,
  Description,
  Visibility,
} from "@mui/icons-material";

import EditProfileDialog from "./EditProfileDialog";

const Profile = () => {
  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser")
  );

  const [profile, setProfile] = useState({
    profileImage: "",
    name: loggedUser?.name || "Student Name",
    email: loggedUser?.email || "student@gmail.com",
    number: "9876543210",
    qualification: "MCA",
    
    cgpa: "8.10",
    tenth: "85%",
    twelfth: "82%",

    graduation: {
      college: "Siliguri Institute of Technology",
      university: "MAKAUT",
      cgpa: "8.10",
    },

    postGraduation: {
      college: "Techno Main Salt Lake",
      university: "MAKAUT",
      cgpa: "8.20",
    },

    resume: null,
  });

  const [openEdit, setOpenEdit] = useState(false);

  const handleSave = (updatedProfile) => {
    setProfile(updatedProfile);
    setOpenEdit(false);
  };

  const viewResume = () => {
    if (!profile.resume) {
      alert("Resume not uploaded yet.");
      return;
    }

    const resumeUrl = URL.createObjectURL(profile.resume);
    window.open(resumeUrl, "_blank");
  };

  const viewStudentDetails = () => {
    alert(
      `Student Details

Name: ${profile.name}
Email: ${profile.email}
Phone: ${profile.number}
Qualification: ${profile.qualification}
CGPA: ${profile.cgpa}
10th: ${profile.tenth}
12th: ${profile.twelfth}`
    );
  };

  return (
    <Box>
      {/* Page Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="700">
            My Profile
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Manage your placement profile and academic details.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={() => setOpenEdit(true)}
        >
          Edit Profile
        </Button>
      </Box>

      {/* Profile Card */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Profile Top */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              mb: 3,
            }}
          >
            <Avatar
              src={profile.profileImage}
              sx={{
                width: 110,
                height: 110,
                bgcolor: "#2563eb",
                fontSize: 40,
              }}
            >
              {!profile.profileImage &&
                profile.name?.charAt(0)?.toUpperCase()}
            </Avatar>

            <Box>
              <Typography variant="h5" fontWeight="700">
                {profile.name}
              </Typography>

              <Chip
                label={profile.qualification}
                sx={{ mt: 1 }}
              />
            </Box>
          </Box>

          <Divider />

          {/* Basic Details */}
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{ mt: 3, mb: 2 }}
          >
            Personal Information
          </Typography>

          <Stack spacing={2}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Email color="primary" />

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Email
                </Typography>

                <Typography fontWeight="600">
                  {profile.email}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Phone color="primary" />

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Phone Number
                </Typography>

                <Typography fontWeight="600">
                  {profile.number}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <School color="primary" />

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Current Qualification
                </Typography>

                <Typography fontWeight="600">
                  {profile.qualification}
                </Typography>
              </Box>
            </Box>
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* Academic Details */}
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{ mb: 2 }}
          >
            Academic Details
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 2,
            }}
          >
            <Card variant="outlined">
              <CardContent>
                <Typography color="text.secondary">
                  10th Percentage
                </Typography>

                <Typography variant="h5" fontWeight="700">
                  {profile.tenth}
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography color="text.secondary">
                  12th Percentage
                </Typography>

                <Typography variant="h5" fontWeight="700">
                  {profile.twelfth}
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography color="text.secondary">
                  Current CGPA
                </Typography>

                <Typography variant="h5" fontWeight="700">
                  {profile.cgpa}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Graduation */}
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{ mt: 4, mb: 2 }}
          >
            Graduation
          </Typography>

          <Card variant="outlined">
            <CardContent>
              <Typography fontWeight="700">
                {profile.graduation.college}
              </Typography>

              <Typography color="text.secondary">
                University: {profile.graduation.university}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                CGPA: <b>{profile.graduation.cgpa}</b>
              </Typography>
            </CardContent>
          </Card>

          {/* Post Graduation */}
          {profile.qualification === "MCA" ||
          profile.qualification === "M.Tech" ||
          profile.qualification === "MBA" ||
          profile.postGraduation?.college ? (
            <>
              <Typography
                variant="h6"
                fontWeight="700"
                sx={{ mt: 4, mb: 2 }}
              >
                Post Graduation
              </Typography>

              <Card variant="outlined">
                <CardContent>
                  <Typography fontWeight="700">
                    {profile.postGraduation.college}
                  </Typography>

                  <Typography color="text.secondary">
                    University:{" "}
                    {profile.postGraduation.university}
                  </Typography>

                  <Typography sx={{ mt: 1 }}>
                    CGPA:{" "}
                    <b>{profile.postGraduation.cgpa}</b>
                  </Typography>
                </CardContent>
              </Card>
            </>
          ) : null}

          {/* Resume */}
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{ mt: 4, mb: 2 }}
          >
            Resume
          </Typography>

          <Card variant="outlined">
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Description color="primary" />

                <Typography>
                  {profile.resume
                    ? profile.resume.name
                    : "No resume uploaded"}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                startIcon={<Visibility />}
                onClick={viewResume}
              >
                View Resume
              </Button>
            </CardContent>
          </Card>

          {/* View Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 4,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Visibility />}
              onClick={viewResume}
            >
              View Resume
            </Button>

            <Button
              variant="outlined"
              startIcon={<Visibility />}
              onClick={viewStudentDetails}
            >
              View Student Details
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Edit Popup */}
      <EditProfileDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        profile={profile}
        onSave={handleSave}
      />
    </Box>
  );
};

export default Profile;


