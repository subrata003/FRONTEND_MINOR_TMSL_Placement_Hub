
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   MenuItem,
//   IconButton,
//   Chip,
//   Grid,
//   InputAdornment,
// } from "@mui/material";

// import {
//   Add,
//   Edit,
//   Delete,
//   Search,
//   Close,
// } from "@mui/icons-material";

// import upcomingCompanies from "../../../public/CompanyData/upcommingCompany.js";

// const STORAGE_KEY = "placementHubCompanies";
// const APPLICATION_KEY = "placementHubApplications";

// const emptyForm = {
//   companyName: "",
//   role: "",
//   location: "",
//   package: "",
//   jobType: "Full Time",
//   status: "Upcoming",
//   driveDate: "",
//   lastDate: "",
//   eligibility: "",
//   minCGPA: "",
//   skills: "",
//   vacancies: "",
//   description: "",
//   website: "",
// };

// const normalizeCompany = (company, index = 0) => ({
//   id: company.id || Date.now() + index,
//   companyName: company.companyName || company.company || "",
//   role: company.role || company.position || "",
//   location: company.location || "",
//   package: company.package || company.salary || "",
//   jobType: company.jobType || company.type || "Full Time",
//   status: company.status || "Upcoming",
//   driveDate: company.driveDate || "",
//   lastDate: company.lastDate || company.applicationDeadline || "",
//   eligibility: company.eligibility || "",
//   minCGPA: company.minCGPA ?? "",
//   skills: Array.isArray(company.skills)
//     ? company.skills.join(", ")
//     : company.skills || "",
//   vacancies: company.vacancies ?? "",
//   description: company.description || "",
//   website: company.website || "",
// });

// const getInitialPlacements = () => {
//   try {
//     const saved = localStorage.getItem(STORAGE_KEY);

//     if (saved !== null) {
//       const parsed = JSON.parse(saved);
//       return Array.isArray(parsed)
//         ? parsed.map((company, index) =>
//             normalizeCompany(company, index)
//           )
//         : [];
//     }

//     const initialData = Array.isArray(upcomingCompanies)
//       ? upcomingCompanies.map((company, index) =>
//           normalizeCompany(company, index)
//         )
//       : [];

//     localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
//     return initialData;
//   } catch (error) {
//     console.error("Error loading companies:", error);
//     return [];
//   }
// };

// const getToday = () => {
//   const date = new Date();
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// };

// const ManagePlacement = () => {
//   const [placements, setPlacements] = useState(getInitialPlacements);
//   const [applications, setApplications] = useState(() => {
//     try {
//       const saved = localStorage.getItem(APPLICATION_KEY);
//       return saved ? JSON.parse(saved) : [];
//     } catch {
//       return [];
//     }
//   });

//   const [open, setOpen] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [formData, setFormData] = useState({ ...emptyForm });

//   // Save company data in localStorage whenever placements change.
//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(placements));
//   }, [placements]);

//   // Refresh applications when the student applies.
//   useEffect(() => {
//     const loadApplications = () => {
//       try {
//         const saved = localStorage.getItem(APPLICATION_KEY);
//         setApplications(saved ? JSON.parse(saved) : []);
//       } catch {
//         setApplications([]);
//       }
//     };

//     window.addEventListener("focus", loadApplications);
//     window.addEventListener("storage", loadApplications);
//     window.addEventListener("applicationsUpdated", loadApplications);

//     return () => {
//       window.removeEventListener("focus", loadApplications);
//       window.removeEventListener("storage", loadApplications);
//       window.removeEventListener(
//         "applicationsUpdated",
//         loadApplications
//       );
//     };
//   }, []);

//   const getEffectiveStatus = (company) => {
//     if (company.lastDate && company.lastDate < getToday()) {
//       return "Closed";
//     }
//     return company.status || "Upcoming";
//   };

//   const getApplicantCount = (company) => {
//     return applications.filter((application) => {
//       if (application.companyId != null) {
//         return String(application.companyId) === String(company.id);
//       }

//       if (application.jobId != null) {
//         return String(application.jobId) === String(company.id);
//       }

//       const applicationName =
//         application.companyName || application.company || "";

//       return (
//         String(applicationName).toLowerCase() ===
//         String(company.companyName).toLowerCase()
//       );
//     }).length;
//   };

//   const totalApplications = applications.length;

//   const upcomingCount = placements.filter(
//     (company) => getEffectiveStatus(company) === "Upcoming"
//   ).length;

//   const ongoingCount = placements.filter(
//     (company) => getEffectiveStatus(company) === "Ongoing"
//   ).length;

//   const closedCount = placements.filter(
//     (company) => getEffectiveStatus(company) === "Closed"
//   ).length;

//   const handleAdd = () => {
//     setEditId(null);
//     setFormData({ ...emptyForm });
//     setOpen(true);
//   };

//   const handleEdit = (company) => {
//     setEditId(company.id);
//     setFormData({
//       ...emptyForm,
//       ...company,
//     });
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setEditId(null);
//     setFormData({ ...emptyForm });
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormData((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     if (
//       !formData.companyName.trim() ||
//       !formData.role.trim() ||
//       !formData.location.trim() ||
//       !String(formData.package).trim() ||
//       !formData.driveDate ||
//       !formData.lastDate
//     ) {
//       alert(
//         "Please fill in company name, role, location, package, drive date and application deadline."
//       );
//       return;
//     }

//     if (formData.lastDate < formData.driveDate) {
//       alert("Application deadline cannot be before the drive date.");
//       return;
//     }

//     const companyData = {
//       ...formData,
//       id: editId || Date.now(),
//       companyName: formData.companyName.trim(),
//       role: formData.role.trim(),
//       location: formData.location.trim(),
//       package: formData.package,
//       minCGPA:
//         formData.minCGPA === "" ? "" : Number(formData.minCGPA),
//       vacancies:
//         formData.vacancies === "" ? "" : Number(formData.vacancies),
//       skills: formData.skills.trim(),
//     };

//     let updatedCompanies;

//     if (editId !== null) {
//       updatedCompanies = placements.map((company) =>
//         company.id === editId ? companyData : company
//       );
//     } else {
//       updatedCompanies = [...placements, companyData];
//     }

//     try {
//       localStorage.setItem(
//         STORAGE_KEY,
//         JSON.stringify(updatedCompanies)
//       );

//       setPlacements(updatedCompanies);
//       handleClose();

//       alert(
//         editId !== null
//           ? "Company updated successfully!"
//           : "Company added successfully!"
//       );
//     } catch (error) {
//       console.error("Error saving company:", error);
//       alert("Unable to save company data. Check localStorage space.");
//     }
//   };

//   const handleDelete = (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this placement?"
//     );

//     if (!confirmDelete) return;

//     const updatedCompanies = placements.filter(
//       (company) => company.id !== id
//     );

//     localStorage.setItem(
//       STORAGE_KEY,
//       JSON.stringify(updatedCompanies)
//     );

//     setPlacements(updatedCompanies);
//   };

//   const filteredPlacements = placements.filter((company) => {
//     const searchText = search.toLowerCase();

//     const matchesSearch =
//       String(company.companyName).toLowerCase().includes(searchText) ||
//       String(company.role).toLowerCase().includes(searchText) ||
//       String(company.location).toLowerCase().includes(searchText);

//     const matchesStatus =
//       filterStatus === "All" ||
//       getEffectiveStatus(company) === filterStatus;

//     return matchesSearch && matchesStatus;
//   });

//   const getStatusColor = (status) => {
//     if (status === "Ongoing") return "success";
//     if (status === "Closed") return "error";
//     return "warning";
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 } }}>
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexWrap: "wrap",
//           gap: 2,
//           mb: 3,
//         }}
//       >
//         <Box>
//           <Typography variant="h4" fontWeight="bold">
//             Manage Placements
//           </Typography>
//           <Typography color="text.secondary">
//             Add and manage company placement drives.
//           </Typography>
//         </Box>

//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={handleAdd}
//         >
//           Add Placement
//         </Button>
//       </Box>

//       {/* Statistics */}
//       <Grid container spacing={2} sx={{ mb: 3 }}>
//         {[
//           {
//             title: "Total Companies",
//             value: placements.length,
//           },
//           {
//             title: "Upcoming",
//             value: upcomingCount,
//           },
//           {
//             title: "Ongoing",
//             value: ongoingCount,
//           },
//           {
//             title: "Closed",
//             value: closedCount,
//           },
//           {
//             title: "Total Applications",
//             value: totalApplications,
//           },
//         ].map((item) => (
//           <Grid item xs={12} sm={6} md={2.4} key={item.title}>
//             <Paper sx={{ p: 2, borderRadius: 2 }}>
//               <Typography color="text.secondary" variant="body2">
//                 {item.title}
//               </Typography>
//               <Typography variant="h4" fontWeight="bold">
//                 {item.value}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Search and filter */}
//       <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={8}>
//             <TextField
//               fullWidth
//               placeholder="Search company, role or location..."
//               value={search}
//               onChange={(event) => setSearch(event.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Search />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <TextField
//               select
//               fullWidth
//               label="Filter by status"
//               value={filterStatus}
//               onChange={(event) =>
//                 setFilterStatus(event.target.value)
//               }
//             >
//               <MenuItem value="All">All Status</MenuItem>
//               <MenuItem value="Upcoming">Upcoming</MenuItem>
//               <MenuItem value="Ongoing">Ongoing</MenuItem>
//               <MenuItem value="Closed">Closed</MenuItem>
//             </TextField>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Company table */}
//       <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><b>Company</b></TableCell>
//               <TableCell><b>Role</b></TableCell>
//               <TableCell><b>Location</b></TableCell>
//               <TableCell><b>Package</b></TableCell>
//               <TableCell><b>Drive Date</b></TableCell>
//               <TableCell><b>Last Date</b></TableCell>
//               <TableCell><b>Vacancies</b></TableCell>
//               <TableCell><b>Applicants</b></TableCell>
//               <TableCell><b>Eligibility</b></TableCell>
//               <TableCell><b>Min CGPA</b></TableCell>
//               <TableCell><b>Skills</b></TableCell>
//               <TableCell><b>Status</b></TableCell>
//               <TableCell align="center"><b>Actions</b></TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {filteredPlacements.length > 0 ? (
//               filteredPlacements.map((company) => {
//                 const status = getEffectiveStatus(company);

//                 return (
//                   <TableRow key={company.id} hover>
//                     <TableCell>
//                       <Typography fontWeight="bold">
//                         {company.companyName}
//                       </Typography>
//                     </TableCell>

//                     <TableCell>{company.role}</TableCell>
//                     <TableCell>{company.location}</TableCell>
//                     <TableCell>{company.package}</TableCell>
//                     <TableCell>{company.driveDate}</TableCell>
//                     <TableCell>{company.lastDate}</TableCell>
//                     <TableCell>{company.vacancies || "-"}</TableCell>
//                     <TableCell>
//                       <Chip
//                         label={getApplicantCount(company)}
//                         color="primary"
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell>{company.eligibility || "-"}</TableCell>
//                     <TableCell>{company.minCGPA || "-"}</TableCell>
//                     <TableCell>{company.skills || "-"}</TableCell>

//                     <TableCell>
//                       <Chip
//                         label={status}
//                         color={getStatusColor(status)}
//                         size="small"
//                       />
//                     </TableCell>

//                     <TableCell>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                         }}
//                       >
//                         <IconButton
//                           color="primary"
//                           onClick={() => handleEdit(company)}
//                         >
//                           <Edit />
//                         </IconButton>

//                         <IconButton
//                           color="error"
//                           onClick={() => handleDelete(company.id)}
//                         >
//                           <Delete />
//                         </IconButton>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={13} align="center">
//                   <Typography color="text.secondary" sx={{ py: 4 }}>
//                     No placement companies found.
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Add/Edit Dialog */}
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Typography variant="h6" fontWeight="bold">
//               {editId !== null ? "Edit Placement" : "Add New Placement"}
//             </Typography>

//             <IconButton onClick={handleClose}>
//               <Close />
//             </IconButton>
//           </Box>
//         </DialogTitle>

//         <DialogContent dividers>
//           <Grid container spacing={2} sx={{ mt: 0 }}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Company Name *"
//                 name="companyName"
//                 value={formData.companyName}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Job Role *"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Location *"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Package (e.g. 7.5 LPA) *"
//                 name="package"
//                 value={formData.package}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 type="date"
//                 label="Drive Date *"
//                 name="driveDate"
//                 value={formData.driveDate}
//                 onChange={handleChange}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 type="date"
//                 label="Application Last Date *"
//                 name="lastDate"
//                 value={formData.lastDate}
//                 onChange={handleChange}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Eligibility"
//                 name="eligibility"
//                 placeholder="e.g. BCA, MCA, B.Tech"
//                 value={formData.eligibility}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Minimum CGPA"
//                 name="minCGPA"
//                 value={formData.minCGPA}
//                 onChange={handleChange}
//                 inputProps={{ min: 0, max: 10, step: 0.01 }}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Number of Vacancies"
//                 name="vacancies"
//                 value={formData.vacancies}
//                 onChange={handleChange}
//                 inputProps={{ min: 0 }}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Required Skills"
//                 name="skills"
//                 placeholder="React, JavaScript, Node.js"
//                 value={formData.skills}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Job Type"
//                 name="jobType"
//                 value={formData.jobType}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="Full Time">Full Time</MenuItem>
//                 <MenuItem value="Internship">Internship</MenuItem>
//                 <MenuItem value="Part Time">Part Time</MenuItem>
//                 <MenuItem value="Contract">Contract</MenuItem>
//               </TextField>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Placement Status"
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="Upcoming">Upcoming</MenuItem>
//                 <MenuItem value="Ongoing">Ongoing</MenuItem>
//                 <MenuItem value="Closed">Closed</MenuItem>
//               </TextField>
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Company Website"
//                 name="website"
//                 placeholder="https://example.com"
//                 value={formData.website}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={3}
//                 label="Job Description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>

//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={handleClose} color="inherit">
//             Cancel
//           </Button>

//           <Button
//             variant="contained"
//             onClick={handleSave}
//           >
//             {editId !== null ? "Update Placement" : "Save Placement"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default ManagePlacement;
import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Dialog, DialogTitle,
  DialogContent, DialogActions, MenuItem, IconButton, Chip, Grid,
  InputAdornment, Stack,
} from "@mui/material";
import { Add, Edit, Delete, Search, Close } from "@mui/icons-material";
import upcomingCompanies from "../../../public/CompanyData/upcommingCompany.js";

const STORAGE_KEY = "placementHubCompanies";
const APPLICATION_KEY = "placementHubApplications";

const emptyForm = {
  companyName: "", role: "", location: "", package: "",
  jobType: "Full Time", status: "Upcoming", driveDate: "", lastDate: "",
  eligibility: "", minCGPA: "", departments: "", qualifications: "",
  maxBacklogs: "", maxTotalBacklogs: "", min10th: "", min12th: "",
  minGraduationCGPA: "", minPostGraduationCGPA: "", requiredRole: "",
  skills: "", vacancies: "", description: "", website: "",
};

const normalizeCompany = (company, index = 0) => ({
  ...emptyForm,
  ...company,
  id: company.id ?? Date.now() + index,
  companyName: company.companyName || company.company || "",
  role: company.role || company.position || "",
  package: company.package || company.salary || "",
  jobType: company.jobType || company.type || "Full Time",
  skills: Array.isArray(company.skills) ? company.skills.join(", ") : company.skills || "",
  departments: Array.isArray(company.departments) ? company.departments.join(", ") : company.departments || "",
  qualifications: Array.isArray(company.qualifications) ? company.qualifications.join(", ") : company.qualifications || company.eligibility || "",
});

const loadInitial = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) return JSON.parse(saved).map(normalizeCompany);
    const initial = Array.isArray(upcomingCompanies) ? upcomingCompanies.map(normalizeCompany) : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  } catch (error) {
    console.error("Could not load placement companies:", error);
    return [];
  }
};

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export default function ManagePlacement() {
  const [placements, setPlacements] = useState(loadInitial);
  const [applications, setApplications] = useState(() => {
    try { return JSON.parse(localStorage.getItem(APPLICATION_KEY) || "[]"); }
    catch { return []; }
  });
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(placements));
    window.dispatchEvent(new Event("placementsUpdated"));
  }, [placements]);

  useEffect(() => {
    const refresh = () => {
      try { setApplications(JSON.parse(localStorage.getItem(APPLICATION_KEY) || "[]")); }
      catch { setApplications([]); }
    };
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("applicationsUpdated", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("applicationsUpdated", refresh);
    };
  }, []);

  const effectiveStatus = (company) => company.lastDate && company.lastDate < today() ? "Closed" : company.status || "Upcoming";

  const applicantCount = (company) => applications.filter((app) => {
    if (app.companyId != null) return String(app.companyId) === String(company.id);
    if (app.jobId != null) return String(app.jobId) === String(company.id);
    return String(app.companyName || app.company || "").toLowerCase() === String(company.companyName).toLowerCase();
  }).length;

  const filtered = useMemo(() => placements.filter((company) => {
    const q = search.toLowerCase();
    const matches = [company.companyName, company.role, company.location].some((v) => String(v || "").toLowerCase().includes(q));
    return matches && (filterStatus === "All" || effectiveStatus(company) === filterStatus);
  }), [placements, search, filterStatus]);

  const openAdd = () => { setEditId(null); setForm({ ...emptyForm }); setOpen(true); };
  const openEdit = (company) => { setEditId(company.id); setForm({ ...emptyForm, ...company, skills: Array.isArray(company.skills) ? company.skills.join(", ") : company.skills || "" }); setOpen(true); };
  const close = () => { setOpen(false); setEditId(null); setForm({ ...emptyForm }); };
  const change = (e) => setForm((old) => ({ ...old, [e.target.name]: e.target.value }));

  const save = () => {
    if (!form.companyName.trim() || !form.role.trim() || !form.location.trim() || !form.package.trim()) {
      alert("Company, role, location and package are required.");
      return;
    }
    if (form.driveDate && form.lastDate && form.lastDate < form.driveDate) {
      alert("Application deadline cannot be before the drive date.");
      return;
    }
    const numeric = ["minCGPA", "maxBacklogs", "maxTotalBacklogs", "min10th", "min12th", "minGraduationCGPA", "minPostGraduationCGPA", "vacancies"];
    const company = {
      ...form,
      id: editId ?? Date.now(),
      companyName: form.companyName.trim(),
      role: form.role.trim(),
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
    };
    numeric.forEach((key) => { company[key] = company[key] === "" ? "" : Number(company[key]); });
    setPlacements((old) => editId === null ? [...old, company] : old.map((item) => item.id === editId ? company : item));
    close();
  };

  const remove = (id) => {
    if (!window.confirm("Delete this placement?")) return;
    setPlacements((old) => old.filter((item) => item.id !== id));
  };

  const statusColor = (status) => status === "Ongoing" ? "success" : status === "Closed" ? "error" : "warning";

  const field = (label, name, props = {}) => (
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label={label} name={name} value={form[name] ?? ""} onChange={change} {...props} />
    </Grid>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} mb={3}>
        <Box><Typography variant="h4" fontWeight={700}>Manage Placements</Typography><Typography color="text.secondary">Manage drives and their eligibility criteria.</Typography></Box>
        <Button variant="contained" startIcon={<Add />} onClick={openAdd}>Add Placement</Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          ["Total Companies", placements.length],
          ["Upcoming", placements.filter((x) => effectiveStatus(x) === "Upcoming").length],
          ["Ongoing", placements.filter((x) => effectiveStatus(x) === "Ongoing").length],
          ["Closed", placements.filter((x) => effectiveStatus(x) === "Closed").length],
          ["Applications", applications.length],
        ].map(([label, value]) => <Grid item xs={12} sm={6} md={2.4} key={label}><Paper sx={{ p: 2 }}><Typography color="text.secondary" variant="body2">{label}</Typography><Typography variant="h4" fontWeight={700}>{value}</Typography></Paper></Grid>)}
      </Grid>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}><TextField fullWidth placeholder="Search company, role or location" value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }} /></Grid>
          <Grid item xs={12} md={4}><TextField select fullWidth label="Filter status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>{["All", "Upcoming", "Ongoing", "Closed"].map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}</TextField></Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead><TableRow>
            {["Company", "Role", "Location", "Package", "Min CGPA", "Departments", "Max Active Backlogs", "Applicants", "Status", "Actions"].map((h) => <TableCell key={h}><b>{h}</b></TableCell>)}
          </TableRow></TableHead>
          <TableBody>
            {filtered.length ? filtered.map((company) => {
              const status = effectiveStatus(company);
              return <TableRow hover key={company.id}>
                <TableCell>{company.companyName}</TableCell>
                <TableCell>{company.role}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>{company.package}</TableCell>
                <TableCell>{company.minCGPA || "-"}</TableCell>
                <TableCell>{company.departments || "-"}</TableCell>
                <TableCell>{company.maxBacklogs === "" ? "Not specified" : company.maxBacklogs}</TableCell>
                <TableCell><Chip label={applicantCount(company)} size="small" color="primary" /></TableCell>
                <TableCell><Chip label={status} color={statusColor(status)} size="small" /></TableCell>
                <TableCell><Stack direction="row"><IconButton color="primary" onClick={() => openEdit(company)}><Edit /></IconButton><IconButton color="error" onClick={() => remove(company.id)}><Delete /></IconButton></Stack></TableCell>
              </TableRow>;
            }) : <TableRow><TableCell colSpan={10} align="center">No placements found.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={close} fullWidth maxWidth="md">
        <DialogTitle><Box display="flex" justifyContent="space-between" alignItems="center">{editId === null ? "Add Placement" : "Edit Placement"}<IconButton onClick={close}><Close /></IconButton></Box></DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            {field("Company Name *", "companyName")}
            {field("Job Role *", "role")}
            {field("Location *", "location")}
            {field("Package *", "package")}
            {field("Drive Date", "driveDate", { type: "date", InputLabelProps: { shrink: true } })}
            {field("Application Last Date", "lastDate", { type: "date", InputLabelProps: { shrink: true } })}
            {field("Minimum CGPA (0–10)", "minCGPA", { type: "number", inputProps: { min: 0, max: 10, step: 0.01 } })}
            {field("Eligible Departments (comma separated)", "departments", { placeholder: "MCA, CSE, IT" })}
            {field("Eligible Qualifications (comma separated)", "qualifications", { placeholder: "MCA, BCA, B.Tech" })}
            {field("Maximum Active Backlogs (blank = no rule)", "maxBacklogs", { type: "number", inputProps: { min: 0, step: 1 } })}
            {field("Maximum Total Backlogs (blank = no rule)", "maxTotalBacklogs", { type: "number", inputProps: { min: 0, step: 1 } })}
            {field("Minimum 10th Percentage", "min10th", { type: "number", inputProps: { min: 0, max: 100, step: 0.01 } })}
            {field("Minimum 12th Percentage", "min12th", { type: "number", inputProps: { min: 0, max: 100, step: 0.01 } })}
            {field("Minimum Graduation CGPA", "minGraduationCGPA", { type: "number", inputProps: { min: 0, max: 10, step: 0.01 } })}
            {field("Minimum Post Graduation CGPA", "minPostGraduationCGPA", { type: "number", inputProps: { min: 0, max: 10, step: 0.01 } })}
            {field("Required Preferred Role (optional)", "requiredRole")}
            {field("Required Skills (comma separated)", "skills")}
            {field("Vacancies", "vacancies", { type: "number", inputProps: { min: 0 } })}
            {field("Website", "website")}
            <Grid item xs={12} sm={6}><TextField select fullWidth label="Job Type" name="jobType" value={form.jobType} onChange={change}>{["Full Time", "Internship", "Part Time", "Contract"].map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}</TextField></Grid>
            <Grid item xs={12} sm={6}><TextField select fullWidth label="Status" name="status" value={form.status} onChange={change}>{["Upcoming", "Ongoing", "Closed"].map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}</TextField></Grid>
            <Grid item xs={12}><TextField fullWidth multiline rows={3} label="Job Description" name="description" value={form.description} onChange={change} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}><Button onClick={close}>Cancel</Button><Button variant="contained" onClick={save}>{editId === null ? "Save Placement" : "Update Placement"}</Button></DialogActions>
      </Dialog>
    </Box>
  );
}
