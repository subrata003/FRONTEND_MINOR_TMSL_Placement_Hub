// // import { useState } from "react";
// // import {
// //   Box,
// //   Card,
// //   CardContent,
// //   Typography,
// //   Avatar,
// //   Button,
// //   Divider,
// //   Stack,
// //   Chip,
// // } from "@mui/material";

// // import {
// //   Edit,
// //   Email,
// //   Phone,
// //   School,
// //   Description,
// //   Visibility,
// // } from "@mui/icons-material";

// // import EditProfileDialog from "./EditProfileDialog";

// // const Profile = () => {
// //   const loggedUser = JSON.parse(
// //     localStorage.getItem("loggedUser")
// //   );

// //   const [profile, setProfile] = useState({
// //     profileImage: "",
// //     name: loggedUser?.name || "Student Name",
// //     email: loggedUser?.email || "student@gmail.com",
// //     number: "9876543210",
// //     qualification: "MCA",

// //     cgpa: "8.10",
// //     tenth: "85%",
// //     twelfth: "82%",

// //     graduation: {
// //       college: "Siliguri Institute of Technology",
// //       university: "MAKAUT",
// //       cgpa: "8.10",
// //     },

// //     postGraduation: {
// //       college: "Techno Main Salt Lake",
// //       university: "MAKAUT",
// //       cgpa: "8.20",
// //     },

// //     resume: null,
// //   });

// //   const [openEdit, setOpenEdit] = useState(false);

// //   const handleSave = (updatedProfile) => {
// //     setProfile(updatedProfile);
// //     setOpenEdit(false);
// //   };

// //   const viewResume = () => {
// //     if (!profile.resume) {
// //       alert("Resume not uploaded yet.");
// //       return;
// //     }

// //     const resumeUrl = URL.createObjectURL(profile.resume);
// //     window.open(resumeUrl, "_blank");
// //   };

// //   const viewStudentDetails = () => {
// //     alert(
// //       `Student Details

// // Name: ${profile.name}
// // Email: ${profile.email}
// // Phone: ${profile.number}
// // Qualification: ${profile.qualification}
// // CGPA: ${profile.cgpa}
// // 10th: ${profile.tenth}
// // 12th: ${profile.twelfth}`
// //     );
// //   };

// //   return (
// //     <Box>
// //       {/* Page Header */}
// //       <Box
// //         sx={{
// //           display: "flex",
// //           justifyContent: "space-between",
// //           alignItems: "center",
// //           mb: 3,
// //         }}
// //       >
// //         <Box>
// //           <Typography variant="h4" fontWeight="700">
// //             My Profile
// //           </Typography>

// //           <Typography color="text.secondary" sx={{ mt: 1 }}>
// //             Manage your placement profile and academic details.
// //           </Typography>
// //         </Box>

// //         <Button
// //           variant="contained"
// //           startIcon={<Edit />}
// //           onClick={() => setOpenEdit(true)}
// //         >
// //           Edit Profile
// //         </Button>
// //       </Box>

// //       {/* Profile Card */}
// //       <Card
// //         sx={{
// //           borderRadius: 3,
// //           boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
// //         }}
// //       >
// //         <CardContent sx={{ p: 4 }}>
// //           {/* Profile Top */}
// //           <Box
// //             sx={{
// //               display: "flex",
// //               alignItems: "center",
// //               gap: 3,
// //               mb: 3,
// //             }}
// //           >
// //             <Avatar
// //               src={profile.profileImage}
// //               sx={{
// //                 width: 110,
// //                 height: 110,
// //                 bgcolor: "#2563eb",
// //                 fontSize: 40,
// //               }}
// //             >
// //               {!profile.profileImage &&
// //                 profile.name?.charAt(0)?.toUpperCase()}
// //             </Avatar>

// //             <Box>
// //               <Typography variant="h5" fontWeight="700">
// //                 {profile.name}
// //               </Typography>

// //               <Chip
// //                 label={profile.qualification}
// //                 sx={{ mt: 1 }}
// //               />
// //             </Box>
// //           </Box>

// //           <Divider />

// //           {/* Basic Details */}
// //           <Typography
// //             variant="h6"
// //             fontWeight="700"
// //             sx={{ mt: 3, mb: 2 }}
// //           >
// //             Personal Information
// //           </Typography>

// //           <Stack spacing={2}>
// //             <Box sx={{ display: "flex", gap: 2 }}>
// //               <Email color="primary" />

// //               <Box>
// //                 <Typography
// //                   variant="body2"
// //                   color="text.secondary"
// //                 >
// //                   Email
// //                 </Typography>

// //                 <Typography fontWeight="600">
// //                   {profile.email}
// //                 </Typography>
// //               </Box>
// //             </Box>

// //             <Box sx={{ display: "flex", gap: 2 }}>
// //               <Phone color="primary" />

// //               <Box>
// //                 <Typography
// //                   variant="body2"
// //                   color="text.secondary"
// //                 >
// //                   Phone Number
// //                 </Typography>

// //                 <Typography fontWeight="600">
// //                   {profile.number}
// //                 </Typography>
// //               </Box>
// //             </Box>

// //             <Box sx={{ display: "flex", gap: 2 }}>
// //               <School color="primary" />

// //               <Box>
// //                 <Typography
// //                   variant="body2"
// //                   color="text.secondary"
// //                 >
// //                   Current Qualification
// //                 </Typography>

// //                 <Typography fontWeight="600">
// //                   {profile.qualification}
// //                 </Typography>
// //               </Box>
// //             </Box>
// //           </Stack>

// //           <Divider sx={{ my: 3 }} />

// //           {/* Academic Details */}
// //           <Typography
// //             variant="h6"
// //             fontWeight="700"
// //             sx={{ mb: 2 }}
// //           >
// //             Academic Details
// //           </Typography>

// //           <Box
// //             sx={{
// //               display: "grid",
// //               gridTemplateColumns:
// //                 "repeat(auto-fit, minmax(180px, 1fr))",
// //               gap: 2,
// //             }}
// //           >
// //             <Card variant="outlined">
// //               <CardContent>
// //                 <Typography color="text.secondary">
// //                   10th Percentage
// //                 </Typography>

// //                 <Typography variant="h5" fontWeight="700">
// //                   {profile.tenth}
// //                 </Typography>
// //               </CardContent>
// //             </Card>

// //             <Card variant="outlined">
// //               <CardContent>
// //                 <Typography color="text.secondary">
// //                   12th Percentage
// //                 </Typography>

// //                 <Typography variant="h5" fontWeight="700">
// //                   {profile.twelfth}
// //                 </Typography>
// //               </CardContent>
// //             </Card>

// //             <Card variant="outlined">
// //               <CardContent>
// //                 <Typography color="text.secondary">
// //                   Current CGPA
// //                 </Typography>

// //                 <Typography variant="h5" fontWeight="700">
// //                   {profile.cgpa}
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </Box>

// //           {/* Graduation */}
// //           <Typography
// //             variant="h6"
// //             fontWeight="700"
// //             sx={{ mt: 4, mb: 2 }}
// //           >
// //             Graduation
// //           </Typography>

// //           <Card variant="outlined">
// //             <CardContent>
// //               <Typography fontWeight="700">
// //                 {profile.graduation.college}
// //               </Typography>

// //               <Typography color="text.secondary">
// //                 University: {profile.graduation.university}
// //               </Typography>

// //               <Typography sx={{ mt: 1 }}>
// //                 CGPA: <b>{profile.graduation.cgpa}</b>
// //               </Typography>
// //             </CardContent>
// //           </Card>

// //           {/* Post Graduation */}
// //           {profile.qualification === "MCA" ||
// //           profile.qualification === "M.Tech" ||
// //           profile.qualification === "MBA" ||
// //           profile.postGraduation?.college ? (
// //             <>
// //               <Typography
// //                 variant="h6"
// //                 fontWeight="700"
// //                 sx={{ mt: 4, mb: 2 }}
// //               >
// //                 Post Graduation
// //               </Typography>

// //               <Card variant="outlined">
// //                 <CardContent>
// //                   <Typography fontWeight="700">
// //                     {profile.postGraduation.college}
// //                   </Typography>

// //                   <Typography color="text.secondary">
// //                     University:{" "}
// //                     {profile.postGraduation.university}
// //                   </Typography>

// //                   <Typography sx={{ mt: 1 }}>
// //                     CGPA:{" "}
// //                     <b>{profile.postGraduation.cgpa}</b>
// //                   </Typography>
// //                 </CardContent>
// //               </Card>
// //             </>
// //           ) : null}

// //           {/* Resume */}
// //           <Typography
// //             variant="h6"
// //             fontWeight="700"
// //             sx={{ mt: 4, mb: 2 }}
// //           >
// //             Resume
// //           </Typography>

// //           <Card variant="outlined">
// //             <CardContent
// //               sx={{
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 alignItems: "center",
// //               }}
// //             >
// //               <Box
// //                 sx={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: 2,
// //                 }}
// //               >
// //                 <Description color="primary" />

// //                 <Typography>
// //                   {profile.resume
// //                     ? profile.resume.name
// //                     : "No resume uploaded"}
// //                 </Typography>
// //               </Box>

// //               <Button
// //                 variant="outlined"
// //                 startIcon={<Visibility />}
// //                 onClick={viewResume}
// //               >
// //                 View Resume
// //               </Button>
// //             </CardContent>
// //           </Card>

// //           {/* View Buttons */}
// //           <Box
// //             sx={{
// //               display: "flex",
// //               gap: 2,
// //               mt: 4,
// //               flexWrap: "wrap",
// //             }}
// //           >
// //             <Button
// //               variant="outlined"
// //               startIcon={<Visibility />}
// //               onClick={viewResume}
// //             >
// //               View Resume
// //             </Button>

// //             <Button
// //               variant="outlined"
// //               startIcon={<Visibility />}
// //               onClick={viewStudentDetails}
// //             >
// //               View Student Details
// //             </Button>
// //           </Box>
// //         </CardContent>
// //       </Card>

// //       {/* Edit Popup */}
// //       <EditProfileDialog
// //         open={openEdit}
// //         onClose={() => setOpenEdit(false)}
// //         profile={profile}
// //         onSave={handleSave}
// //       />
// //     </Box>
// //   );
// // };

// // export default Profile;
// import { useEffect, useState } from "react";

// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   Button,
//   Divider,
//   Stack,
//   Chip,
// } from "@mui/material";

// import {
//   Edit,
//   Email,
//   Phone,
//   School,
//   Description,
//   Visibility,
// } from "@mui/icons-material";

// import EditProfileDialog from "./EditProfileDialog";

// import {
//   defaultProfile,
//   getProfile,
//   saveProfile,
// } from "./ProfileStorage";

// const Profile = () => {
//   // Get logged-in student
//   const loggedUser = JSON.parse(
//     localStorage.getItem("loggedUser") || "null"
//   );

//   // Use student ID; if unavailable, use email
//   const userId = loggedUser?.id || loggedUser?.email;

//   const [profile, setProfile] = useState({
//     ...defaultProfile,
//     name: loggedUser?.name || "",
//     email: loggedUser?.email || "",
//   });

//   const [openEdit, setOpenEdit] = useState(false);

//   // Load saved profile when page opens
//   useEffect(() => {
//     if (!userId) return;

//     const savedProfile = getProfile(userId);

//     if (savedProfile) {
//       setProfile({
//         ...defaultProfile,
//         ...savedProfile,

//         graduation: {
//           ...defaultProfile.graduation,
//           ...savedProfile.graduation,
//         },

//         postGraduation: {
//           ...defaultProfile.postGraduation,
//           ...savedProfile.postGraduation,
//         },
//       });
//     }
//   }, [userId]);

//   // Save updated profile
//   const handleSave = (updatedProfile) => {
//     try {
//       const savedProfile = saveProfile(userId, updatedProfile);

//       setProfile(savedProfile);
//       setOpenEdit(false);

//       alert("Profile saved successfully!");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   // View uploaded resume
//   const viewResume = () => {
//     if (!profile.resume?.data) {
//       alert("Resume not uploaded yet.");
//       return;
//     }

//     const resumeWindow = window.open("", "_blank");

//     if (!resumeWindow) {
//       alert("Please allow pop-ups to view your resume.");
//       return;
//     }

//     resumeWindow.location.href = profile.resume.data;
//   };

//   // View student details
//   const viewStudentDetails = () => {
//     alert(
//       `Student Details

// Name: ${profile.name}
// Email: ${profile.email}
// Phone: ${profile.number}
// Qualification: ${profile.qualification}

// CGPA: ${profile.cgpa}
// 10th: ${profile.tenth}
// 12th: ${profile.twelfth}

// Graduation College: ${profile.graduation.college}
// Graduation University: ${profile.graduation.university}
// Graduation CGPA: ${profile.graduation.cgpa}

// Post Graduation College: ${profile.postGraduation.college}
// Post Graduation University: ${profile.postGraduation.university}
// Post Graduation CGPA: ${profile.postGraduation.cgpa}`
//     );
//   };

//   return (
//     <Box>
//       {/* Page Header */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
//           flexWrap: "wrap",
//           gap: 2,
//         }}
//       >
//         <Box>
//           <Typography variant="h4" fontWeight="700">
//             My Profile
//           </Typography>

//           <Typography color="text.secondary" sx={{ mt: 1 }}>
//             Manage your placement profile and academic details.
//           </Typography>
//         </Box>

//         <Button
//           variant="contained"
//           startIcon={<Edit />}
//           onClick={() => setOpenEdit(true)}
//         >
//           Edit Profile
//         </Button>
//       </Box>

//       {/* Profile Card */}
//       <Card
//         sx={{
//           borderRadius: 3,
//           boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
//         }}
//       >
//         <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
//           {/* Profile Top */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 3,
//               mb: 3,
//               flexWrap: "wrap",
//             }}
//           >
//             <Avatar
//               src={profile.profileImage?.data || ""}
//               sx={{
//                 width: 110,
//                 height: 110,
//                 bgcolor: "#2563eb",
//                 fontSize: 40,
//               }}
//             >
//               {!profile.profileImage?.data &&
//                 profile.name?.charAt(0)?.toUpperCase()}
//             </Avatar>

//             <Box>
//               <Typography variant="h5" fontWeight="700">
//                 {profile.name || "Student Name"}
//               </Typography>

//               <Chip
//                 label={profile.qualification || "Qualification"}
//                 sx={{ mt: 1 }}
//               />
//             </Box>
//           </Box>

//           <Divider />

//           {/* Personal Information */}
//           <Typography
//             variant="h6"
//             fontWeight="700"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Personal Information
//           </Typography>

//           <Stack spacing={2}>
//             <Box sx={{ display: "flex", gap: 2 }}>
//               <Email color="primary" />

//               <Box>
//                 <Typography variant="body2" color="text.secondary">
//                   Email
//                 </Typography>

//                 <Typography fontWeight="600">
//                   {profile.email || "Not provided"}
//                 </Typography>
//               </Box>
//             </Box>

//             <Box sx={{ display: "flex", gap: 2 }}>
//               <Phone color="primary" />

//               <Box>
//                 <Typography variant="body2" color="text.secondary">
//                   Phone Number
//                 </Typography>

//                 <Typography fontWeight="600">
//                   {profile.number || "Not provided"}
//                 </Typography>
//               </Box>
//             </Box>

//             <Box sx={{ display: "flex", gap: 2 }}>
//               <School color="primary" />

//               <Box>
//                 <Typography variant="body2" color="text.secondary">
//                   Current Qualification
//                 </Typography>

//                 <Typography fontWeight="600">
//                   {profile.qualification}
//                 </Typography>
//               </Box>
//             </Box>
//           </Stack>

//           <Divider sx={{ my: 3 }} />

//           {/* Academic Details */}
//           <Typography variant="h6" fontWeight="700" sx={{ mb: 2 }}>
//             Academic Details
//           </Typography>

//           <Box
//             sx={{
//               display: "grid",
//               gridTemplateColumns:
//                 "repeat(auto-fit, minmax(180px, 1fr))",
//               gap: 2,
//             }}
//           >
//             <Card variant="outlined">
//               <CardContent>
//                 <Typography color="text.secondary">
//                   10th Percentage
//                 </Typography>

//                 <Typography variant="h5" fontWeight="700">
//                   {profile.tenth || "Not provided"}
//                 </Typography>
//               </CardContent>
//             </Card>

//             <Card variant="outlined">
//               <CardContent>
//                 <Typography color="text.secondary">
//                   12th Percentage
//                 </Typography>

//                 <Typography variant="h5" fontWeight="700">
//                   {profile.twelfth || "Not provided"}
//                 </Typography>
//               </CardContent>
//             </Card>

//             <Card variant="outlined">
//               <CardContent>
//                 <Typography color="text.secondary">
//                   Current CGPA
//                 </Typography>

//                 <Typography variant="h5" fontWeight="700">
//                   {profile.cgpa || "Not provided"}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Box>

//           {/* Graduation */}
//           <Typography
//             variant="h6"
//             fontWeight="700"
//             sx={{ mt: 4, mb: 2 }}
//           >
//             Graduation
//           </Typography>

//           <Card variant="outlined">
//             <CardContent>
//               <Typography fontWeight="700">
//                 {profile.graduation?.college || "College not provided"}
//               </Typography>

//               <Typography color="text.secondary">
//                 University:{" "}
//                 {profile.graduation?.university || "Not provided"}
//               </Typography>

//               <Typography sx={{ mt: 1 }}>
//                 CGPA:{" "}
//                 <b>{profile.graduation?.cgpa || "Not provided"}</b>
//               </Typography>
//             </CardContent>
//           </Card>

//           {/* Post Graduation */}
//           {["MCA", "M.Tech", "MBA"].includes(profile.qualification) && (
//             <>
//               <Typography
//                 variant="h6"
//                 fontWeight="700"
//                 sx={{ mt: 4, mb: 2 }}
//               >
//                 Post Graduation
//               </Typography>

//               <Card variant="outlined">
//                 <CardContent>
//                   <Typography fontWeight="700">
//                     {profile.postGraduation?.college || "College not provided"}
//                   </Typography>

//                   <Typography color="text.secondary">
//                     University:{" "}
//                     {profile.postGraduation?.university || "Not provided"}
//                   </Typography>

//                   <Typography sx={{ mt: 1 }}>
//                     CGPA:{" "}
//                     <b>
//                       {profile.postGraduation?.cgpa || "Not provided"}
//                     </b>
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </>
//           )}

//           {/* Resume */}
//           <Typography
//             variant="h6"
//             fontWeight="700"
//             sx={{ mt: 4, mb: 2 }}
//           >
//             Resume
//           </Typography>

//           <Card variant="outlined">
//             <CardContent
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 flexWrap: "wrap",
//                 gap: 2,
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <Description color="primary" />

//                 <Typography>
//                   {profile.resume?.name || "No resume uploaded"}
//                 </Typography>
//               </Box>

//               <Button
//                 variant="outlined"
//                 startIcon={<Visibility />}
//                 onClick={viewResume}
//                 disabled={!profile.resume?.data}
//               >
//                 View Resume
//               </Button>
//             </CardContent>
//           </Card>

//           {/* View Buttons */}
//           <Box
//             sx={{
//               display: "flex",
//               gap: 2,
//               mt: 4,
//               flexWrap: "wrap",
//             }}
//           >
//             <Button
//               variant="outlined"
//               startIcon={<Visibility />}
//               onClick={viewStudentDetails}
//             >
//               View Student Details
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>

//       {/* Edit Profile Dialog */}
//       <EditProfileDialog
//         open={openEdit}
//         onClose={() => setOpenEdit(false)}
//         profile={profile}
//         onSave={handleSave}
//       />
//     </Box>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from "react";
import {
  Box, Card, CardContent, Typography, Avatar, Button, Divider,
  Stack, Chip, Grid,
} from "@mui/material";
import { Edit, Email, Phone, School, Description, Visibility } from "@mui/icons-material";
import EditProfileDialog from "./EditProfileDialog";
import Eligibility from "./Eligibility";
import { defaultProfile, getProfile, saveProfile, getLoggedUserId } from './ProfileStorage';

export default function Profile() {
  const loggedUser = (() => {
    try { return JSON.parse(localStorage.getItem("loggedUser") || "null"); }
    catch { return null; }
  })();
  const userId = getLoggedUserId();
  const [profile, setProfile] = useState({
    ...defaultProfile,
    name: loggedUser?.name || "",
    email: loggedUser?.email || "",
  });
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const saved = getProfile(userId);
    if (saved) setProfile({ ...defaultProfile, ...saved });
  }, [userId]);

  const handleSave = (updated) => {
    try {
      const saved = saveProfile(userId, updated);
      setProfile(saved);
      setOpenEdit(false);
      alert("Profile saved successfully.");
    } catch (error) {
      alert(error.message);
    }
  };

  const viewFile = (file) => {
    if (!file?.data) {
      alert("File has not been uploaded.");
      return;
    }
    const newWindow = window.open();
    if (!newWindow) {
      alert("Please allow pop-ups to view the file.");
      return;
    }
    newWindow.location.href = file.data;
  };

  const detail = (label, value) => (
    <Box>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography fontWeight={600}>{value || "Not provided"}</Typography>
    </Box>
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={700}>My Profile</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>Manage your placement profile and academic details.</Typography>
        </Box>
        <Button variant="contained" startIcon={<Edit />} onClick={() => setOpenEdit(true)}>Edit Profile</Button>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
          <Box display="flex" alignItems="center" gap={3} flexWrap="wrap" mb={3}>
            <Avatar src={profile.profileImage?.data || ""} sx={{ width: 105, height: 105, bgcolor: "#2563eb", fontSize: 40 }}>
              {!profile.profileImage?.data && (profile.name?.charAt(0)?.toUpperCase() || "S")}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700}>{profile.name || "Student Name"}</Typography>
              <Chip label={profile.qualification || "Qualification not provided"} sx={{ mt: 1 }} />
            </Box>
          </Box>
          <Divider />
          <Typography variant="h6" fontWeight={700} sx={{ mt: 3, mb: 2 }}>Personal Information</Typography>
          <Stack spacing={2}>
            <Box display="flex" gap={2}><Email color="primary" />{detail("Email", profile.email)}</Box>
            <Box display="flex" gap={2}><Phone color="primary" />{detail("Phone Number", profile.number)}</Box>
            <Box display="flex" gap={2}><School color="primary" />{detail("Department", profile.department)}</Box>
          </Stack>

          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Academic Details</Typography>
          <Grid container spacing={2}>
            {[
              ["10th Percentage", profile.tenth],
              ["12th Percentage", profile.twelfth],
              ["Current CGPA", profile.cgpa],
              ["Current Backlogs", profile.currentBacklogs],
              ["Total Backlogs", profile.totalBacklogs],
            ].map(([label, value]) => (
              <Grid item xs={12} sm={6} md={4} key={label}>
                <Card variant="outlined"><CardContent>{detail(label, value)}</CardContent></Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" fontWeight={700} sx={{ mt: 4, mb: 2 }}>Graduation</Typography>
          <Card variant="outlined"><CardContent>
            {detail("College", profile.graduation?.college)}
            {detail("University", profile.graduation?.university)}
            {detail("CGPA", profile.graduation?.cgpa)}
          </CardContent></Card>

          {["MCA", "M.Tech", "MBA", "M.Sc"].includes(profile.qualification) && (
            <>
              <Typography variant="h6" fontWeight={700} sx={{ mt: 4, mb: 2 }}>Post Graduation</Typography>
              <Card variant="outlined"><CardContent>
                {detail("College", profile.postGraduation?.college)}
                {detail("University", profile.postGraduation?.university)}
                {detail("CGPA", profile.postGraduation?.cgpa)}
              </CardContent></Card>
            </>
          )}

          <Typography variant="h6" fontWeight={700} sx={{ mt: 4, mb: 2 }}>Placement Information</Typography>
          <Card variant="outlined"><CardContent>
            {detail("Preferred Role", profile.targetRole)}
          </CardContent></Card>

          <Typography variant="h6" fontWeight={700} sx={{ mt: 4, mb: 2 }}>Resume</Typography>
          <Card variant="outlined"><CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
            <Box display="flex" alignItems="center" gap={2}><Description color="primary" /><Typography>{profile.resume?.name || "No resume uploaded"}</Typography></Box>
            <Button variant="outlined" startIcon={<Visibility />} onClick={() => viewFile(profile.resume)} disabled={!profile.resume?.data}>View Resume</Button>
          </CardContent></Card>

          <Box mt={3}>
            <Button variant="outlined" startIcon={<Visibility />} onClick={() => {
              const lines = [
                `Name: ${profile.name}`, `Email: ${profile.email}`,
                `Phone: ${profile.number}`, `Qualification: ${profile.qualification}`,
                `Department: ${profile.department}`, `CGPA: ${profile.cgpa}`,
                `10th: ${profile.tenth}`, `12th: ${profile.twelfth}`,
                `Current Backlogs: ${profile.currentBacklogs}`,
                `Total Backlogs: ${profile.totalBacklogs}`,
                `Preferred Role: ${profile.targetRole}`,
              ];
              alert(lines.join("\n"));
            }}>View Student Details</Button>
          </Box>
        </CardContent>
      </Card>

            

      <EditProfileDialog open={openEdit} onClose={() => setOpenEdit(false)} profile={profile} onSave={handleSave} />
    </Box>
  );
}
