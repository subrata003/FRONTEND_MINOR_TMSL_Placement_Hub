import React from 'react'

const Dashboard = () => {
  return (
    <div>
      
    </div>
  )
}

export default Dashboard

// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Chip,
//   Avatar,
// } from "@mui/material";

// import {
//   BusinessCenter,
//   Assignment,
//   Event,
//   EmojiEvents,
//   ArrowForward,
//   CalendarMonth,
//   LocationOn,
// } from "@mui/icons-material";

// import { useNavigate } from "react-router-dom";

// import upcomingCompanies from '../../../public/CompanyData/upcommingCompany.js'


// // =====================================
// // Dashboard Statistics
// // =====================================

// const stats = [
//   {
//     title: "Upcoming Drives",
//     value: upcomingCompanies.length,
//     icon: <BusinessCenter />,
//     color: "#2563eb",
//     path: "/student/jobs",
//   },
//   {
//     title: "Applications",
//     value: "05",
//     icon: <Assignment />,
//     color: "#7c3aed",
//     path: "/student/applications",
//   },
//   {
//     title: "Interviews",
//     value: "02",
//     icon: <Event />,
//     color: "#ea580c",
//     path: "/student/interviews",
//   },
//   {
//     title: "Results",
//     value: "01",
//     icon: <EmojiEvents />,
//     color: "#059669",
//     path: "/student/results",
//   },
// ];


// // =====================================
// // Recent Applications
// // =====================================

// const applications = [
//   {
//     id: 1,
//     company: "TCS",
//     role: "Software Developer",
//     status: "Shortlisted",
//     date: "20 Sep 2026",
//   },
//   {
//     id: 2,
//     company: "Infosys",
//     role: "System Engineer",
//     status: "In Review",
//     date: "18 Sep 2026",
//   },
//   {
//     id: 3,
//     company: "Wipro",
//     role: "Graduate Engineer",
//     status: "Applied",
//     date: "15 Sep 2026",
//   },
// ];


// // =====================================
// // Status Color
// // =====================================

// const getStatusColor = (status) => {
//   if (status === "Shortlisted") {
//     return "success";
//   }

//   if (status === "In Review") {
//     return "warning";
//   }

//   if (status === "Rejected") {
//     return "error";
//   }

//   return "default";
// };


// // =====================================
// // Dashboard
// // =====================================

// function Dashboard() {
//   const navigate = useNavigate();

//   // Only first 4 companies will be shown
//   const dashboardCompanies = upcomingCompanies.slice(0, 4);

//   return (
//     <Box>

//       {/* =====================================
//           Welcome Section
//       ===================================== */}

//       <Box mb={4}>
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           color="#111827"
//         >
//           Welcome back, Sourav! 👋
//         </Typography>

//         <Typography
//           color="text.secondary"
//           mt={0.5}
//         >
//           Here is what's happening with your placement journey.
//         </Typography>
//       </Box>


//       {/* =====================================
//           Statistics Cards
//       ===================================== */}

//       <Grid container spacing={3} mb={4}>

//         {stats.map((item) => (
//           <Grid
//             item
//             xs={12}
//             sm={6}
//             md={3}
//             key={item.title}
//           >
//             <Card
//               onClick={() => navigate(item.path)}
//               sx={{
//                 borderRadius: 3,
//                 cursor: "pointer",
//                 boxShadow:
//                   "0 2px 12px rgba(0,0,0,0.06)",

//                 transition: "0.2s",

//                 "&:hover": {
//                   transform: "translateY(-3px)",
//                   boxShadow:
//                     "0 6px 20px rgba(0,0,0,0.10)",
//                 },
//               }}
//             >
//               <CardContent>

//                 <Box
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >

//                   <Avatar
//                     sx={{
//                       bgcolor: `${item.color}15`,
//                       color: item.color,
//                     }}
//                   >
//                     {item.icon}
//                   </Avatar>

//                   <Typography
//                     variant="h4"
//                     fontWeight="bold"
//                   >
//                     {item.value}
//                   </Typography>

//                 </Box>

//                 <Typography
//                   color="text.secondary"
//                   mt={2}
//                 >
//                   {item.title}
//                 </Typography>

//               </CardContent>
//             </Card>
//           </Grid>
//         ))}

//       </Grid>


//       {/* =====================================
//           Main Dashboard Content
//       ===================================== */}

//       <Grid container spacing={3}>


//         {/* =================================
//             Upcoming Companies
//         ================================= */}

//         <Grid item xs={12} md={8}>

//           <Card
//             sx={{
//               borderRadius: 3,
//               height: "100%",
//               boxShadow:
//                 "0 2px 12px rgba(0,0,0,0.05)",
//             }}
//           >

//             <CardContent>

//               {/* Heading */}

//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb={3}
//               >

//                 <Box>

//                   <Typography
//                     variant="h6"
//                     fontWeight="bold"
//                   >
//                     Upcoming Placement Drives
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                   >
//                     Companies visiting your campus
//                   </Typography>

//                 </Box>

//                 <Button
//                   endIcon={<ArrowForward />}
//                   onClick={() =>
//                     navigate("/student/jobs")
//                   }
//                 >
//                   View All
//                 </Button>

//               </Box>


//               {/* =================================
//                   Company List

//                   Only 4 companies shown
//               ================================= */}

//               <Grid container spacing={2}>

//                 {dashboardCompanies.map((company) => (

//                   <Grid
//                     item
//                     xs={12}
//                     sm={6}
//                     key={company.id}
//                   >

//                     <Card
//                       variant="outlined"
//                       sx={{
//                         borderRadius: 2,
//                         height: "100%",

//                         "&:hover": {
//                           borderColor: "#2563eb",
//                           boxShadow:
//                             "0 4px 12px rgba(37,99,235,0.10)",
//                         },
//                       }}
//                     >

//                       <CardContent>

//                         {/* Company Header */}

//                         <Box
//                           display="flex"
//                           alignItems="center"
//                           gap={1.5}
//                           mb={2}
//                         >

//                           <Avatar
//                             sx={{
//                               width: 45,
//                               height: 45,
//                               bgcolor: "#eff6ff",
//                               color: "#2563eb",
//                               fontWeight: "bold",
//                             }}
//                           >
//                             {company.logo}
//                           </Avatar>

//                           <Box>

//                             <Typography
//                               fontWeight="bold"
//                             >
//                               {company.company}
//                             </Typography>

//                             <Typography
//                               variant="body2"
//                               color="text.secondary"
//                             >
//                               {company.role}
//                             </Typography>

//                           </Box>

//                         </Box>


//                         {/* Package */}

//                         <Typography
//                           color="success.main"
//                           fontWeight="bold"
//                           mb={1.5}
//                         >
//                           💰 {company.package}
//                         </Typography>


//                         {/* Location */}

//                         <Box
//                           display="flex"
//                           alignItems="center"
//                           gap={0.5}
//                           mb={1}
//                         >

//                           <LocationOn
//                             sx={{
//                               fontSize: 18,
//                               color: "#6b7280",
//                             }}
//                           />

//                           <Typography
//                             variant="body2"
//                             color="text.secondary"
//                           >
//                             {company.location}
//                           </Typography>

//                         </Box>


//                         {/* Drive Date */}

//                         <Box
//                           display="flex"
//                           alignItems="center"
//                           gap={0.5}
//                           mb={2}
//                         >

//                           <CalendarMonth
//                             sx={{
//                               fontSize: 18,
//                               color: "#6b7280",
//                             }}
//                           />

//                           <Typography
//                             variant="body2"
//                             color="text.secondary"
//                           >
//                             {company.driveDate}
//                           </Typography>

//                         </Box>


//                         {/* Status + Details */}

//                         <Box
//                           display="flex"
//                           justifyContent="space-between"
//                           alignItems="center"
//                         >

//                           <Chip
//                             label={company.status}
//                             color="success"
//                             size="small"
//                           />

//                           <Button
//                             size="small"
//                             variant="outlined"
//                             onClick={() =>
//                               navigate(
//                                 `/student/jobs/${company.id}`
//                               )
//                             }
//                           >
//                             View Details
//                           </Button>

//                         </Box>

//                       </CardContent>

//                     </Card>

//                   </Grid>

//                 ))}

//               </Grid>

//             </CardContent>

//           </Card>

//         </Grid>


//         {/* =================================
//             Recent Applications
//         ================================= */}

//         <Grid item xs={12} md={4}>

//           <Card
//             sx={{
//               borderRadius: 3,
//               height: "100%",
//               boxShadow:
//                 "0 2px 12px rgba(0,0,0,0.05)",
//             }}
//           >

//             <CardContent>

//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb={2}
//               >

//                 <Box>

//                   <Typography
//                     variant="h6"
//                     fontWeight="bold"
//                   >
//                     Recent Applications
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                   >
//                     Track your applications
//                   </Typography>

//                 </Box>

//                 <Button
//                   size="small"
//                   onClick={() =>
//                     navigate("/student/applications")
//                   }
//                 >
//                   View
//                 </Button>

//               </Box>


//               {/* Applications */}

//               {applications.map((application) => (

//                 <Box
//                   key={application.id}
//                   sx={{
//                     py: 2,
//                     borderBottom:
//                       "1px solid #e5e7eb",
//                   }}
//                 >

//                   <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     gap={1}
//                   >

//                     <Box>

//                       <Typography
//                         fontWeight="bold"
//                       >
//                         {application.company}
//                       </Typography>

//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                       >
//                         {application.role}
//                       </Typography>

//                       <Typography
//                         variant="caption"
//                         color="text.secondary"
//                       >
//                         {application.date}
//                       </Typography>

//                     </Box>

//                     <Chip
//                       label={application.status}
//                       size="small"
//                       color={getStatusColor(
//                         application.status
//                       )}
//                     />

//                   </Box>

//                 </Box>

//               ))}

//             </CardContent>

//           </Card>

//         </Grid>

//       </Grid>


//       {/* =====================================
//           Quick Actions
//       ===================================== */}

//       <Box mt={4}>

//         <Typography
//           variant="h6"
//           fontWeight="bold"
//           mb={2}
//         >
//           Quick Actions
//         </Typography>

//         <Grid container spacing={2}>

//           <Grid item>

//             <Button
//               variant="contained"
//               onClick={() =>
//                 navigate("/student/profile")
//               }
//             >
//               Complete Profile
//             </Button>

//           </Grid>

//           <Grid item>

//             <Button
//               variant="outlined"
//               onClick={() =>
//                 navigate("/student/jobs")
//               }
//             >
//               Find Jobs
//             </Button>

//           </Grid>

//           <Grid item>

//             <Button
//               variant="outlined"
//               onClick={() =>
//                 navigate("/student/interviews")
//               }
//             >
//               View Interviews
//             </Button>

//           </Grid>

//         </Grid>

//       </Box>

//     </Box>
//   );
// }

// export default Dashboard;
