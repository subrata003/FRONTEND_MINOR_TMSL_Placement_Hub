
// import { useEffect, useState } from "react";

// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Box,
//   Typography,
//   Avatar,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Divider,
// } from "@mui/material";
// import { convertFileToBase64 } from "./ProfileStorage";



// const EditProfileDialog = ({
//   open,
//   onClose,
//   profile,
//   onSave,
// }) => {
//   const [formData, setFormData] = useState(profile);
//   const [uploading, setUploading] = useState(false);

//   // Update form whenever dialog opens
//   useEffect(() => {
//     if (open) {
//       setFormData({
//         ...profile,
//         graduation: {
//           college: "",
//           university: "",
//           cgpa: "",
//           ...profile.graduation,
//         },
//         postGraduation: {
//           college: "",
//           university: "",
//           cgpa: "",
//           ...profile.postGraduation,
//         },
//       });
//     }
//   }, [open, profile]);

//   // Handle normal input fields
//   const handleChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // Handle graduation fields
//   const handleGraduationChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       graduation: {
//         ...prev.graduation,
//         [field]: value,
//       },
//     }));
//   };

//   // Handle post-graduation fields
//   const handlePostGraduationChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       postGraduation: {
//         ...prev.postGraduation,
//         [field]: value,
//       },
//     }));
//   };

//   // Upload profile image
//   const handleProfileImage = async (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       alert("Please select a valid image.");
//       event.target.value = "";
//       return;
//     }

//     if (file.size > 1024 * 1024) {
//       alert("Profile image must be smaller than 1 MB.");
//       event.target.value = "";
//       return;
//     }

//     try {
//       const image = await convertFileToBase64(file);
//       handleChange("profileImage", image);
//     } catch (error) {
//       alert(error.message);
//     }

//     event.target.value = "";
//   };

//   // Upload resume
//   const handleResume = async (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     const allowedTypes = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ];

//     if (!allowedTypes.includes(file.type)) {
//       alert("Please upload a PDF, DOC, or DOCX file.");
//       event.target.value = "";
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       alert("Resume must be smaller than 2 MB.");
//       event.target.value = "";
//       return;
//     }

//     try {
//       const resume = await convertFileToBase64(file);
//       handleChange("resume", resume);
//     } catch (error) {
//       alert(error.message);
//     }

//     event.target.value = "";
//   };

//   // Save profile
//   const handleSave = async () => {
//     setUploading(true);

//     try {
//       await onSave(formData);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       fullWidth
//       maxWidth="md"
//     >
//       <DialogTitle>
//         <Typography variant="h5" fontWeight="700">
//           Edit Profile
//         </Typography>

//         <Typography
//           variant="body2"
//           color="text.secondary"
//           sx={{ mt: 0.5 }}
//         >
//           Update your personal and academic information.
//         </Typography>
//       </DialogTitle>

//       <DialogContent dividers>
//         {/* Profile Image */}
//         <Typography variant="h6" fontWeight="700" sx={{ mb: 2 }}>
//           Profile Image
//         </Typography>

//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 3,
//             mb: 3,
//             flexWrap: "wrap",
//           }}
//         >
//           <Avatar
//             src={formData.profileImage?.data || ""}
//             sx={{
//               width: 90,
//               height: 90,
//               bgcolor: "#2563eb",
//               fontSize: 30,
//             }}
//           >
//             {!formData.profileImage?.data &&
//               formData.name?.charAt(0)?.toUpperCase()}
//           </Avatar>

//           <Button variant="outlined" component="label">
//             Change Image

//             <input
//               hidden
//               type="file"
//               accept="image/*"
//               onChange={handleProfileImage}
//             />
//           </Button>
//         </Box>

//         <Divider sx={{ mb: 3 }} />

//         {/* Personal Details */}
//         <Typography variant="h6" fontWeight="700" sx={{ mb: 2 }}>
//           Personal Details
//         </Typography>

//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr",
//               sm: "repeat(2, 1fr)",
//             },
//             gap: 2,
//           }}
//         >
//           <TextField
//             label="Full Name"
//             value={formData.name || ""}
//             onChange={(e) => handleChange("name", e.target.value)}
//             fullWidth
//           />

//           <TextField
//             label="Email ID"
//             type="email"
//             value={formData.email || ""}
//             onChange={(e) => handleChange("email", e.target.value)}
//             fullWidth
//           />

//           <TextField
//             label="Phone Number"
//             value={formData.number || ""}
//             onChange={(e) => handleChange("number", e.target.value)}
//             fullWidth
//           />

//           <FormControl fullWidth>
//             <InputLabel>Current Qualification</InputLabel>

//             <Select
//               value={formData.qualification || "MCA"}
//               label="Current Qualification"
//               onChange={(e) =>
//                 handleChange("qualification", e.target.value)
//               }
//             >
//               <MenuItem value="BCA">BCA</MenuItem>
//               <MenuItem value="B.Tech">B.Tech</MenuItem>
//               <MenuItem value="MCA">MCA</MenuItem>
//               <MenuItem value="M.Tech">M.Tech</MenuItem>
//               <MenuItem value="MBA">MBA</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>

//         <Divider sx={{ my: 3 }} />

//         {/* Academic Details */}
//         <Typography variant="h6" fontWeight="700" sx={{ mb: 2 }}>
//           Academic Details
//         </Typography>

//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr",
//               sm: "repeat(3, 1fr)",
//             },
//             gap: 2,
//           }}
//         >
//           <TextField
//             label="10th Percentage"
//             value={formData.tenth || ""}
//             onChange={(e) => handleChange("tenth", e.target.value)}
//             fullWidth
//           />

//           <TextField
//             label="12th Percentage"
//             value={formData.twelfth || ""}
//             onChange={(e) => handleChange("twelfth", e.target.value)}
//             fullWidth
//           />

//           <TextField
//             label="Current CGPA"
//             value={formData.cgpa || ""}
//             onChange={(e) => handleChange("cgpa", e.target.value)}
//             fullWidth
//           />
//         </Box>

//         <Divider sx={{ my: 3 }} />

//         {/* Graduation Details */}
//         <Typography variant="h6" fontWeight="700" sx={{ mb: 2 }}>
//           Graduation Details
//         </Typography>

//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr",
//               sm: "repeat(3, 1fr)",
//             },
//             gap: 2,
//           }}
//         >
//           <TextField
//             label="College Name"
//             value={formData.graduation?.college || ""}
//             onChange={(e) =>
//               handleGraduationChange("college", e.target.value)
//             }
//             fullWidth
//           />

//           <TextField
//             label="University Name"
//             value={formData.graduation?.university || ""}
//             onChange={(e) =>
//               handleGraduationChange("university", e.target.value)
//             }
//             fullWidth
//           />

//           <TextField
//             label="CGPA"
//             value={formData.graduation?.cgpa || ""}
//             onChange={(e) =>
//               handleGraduationChange("cgpa", e.target.value)
//             }
//             fullWidth
//           />
//         </Box>

//         {/* Post Graduation Details */}
//         {["MCA", "M.Tech", "MBA"].includes(formData.qualification) && (
//           <>
//             <Typography
//               variant="h6"
//               fontWeight="700"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Post Graduation Details
//             </Typography>

//             <Box
//               sx={{
//                 display: "grid",
//                 gridTemplateColumns: {
//                   xs: "1fr",
//                   sm: "repeat(3, 1fr)",
//                 },
//                 gap: 2,
//               }}
//             >
//               <TextField
//                 label="College Name"
//                 value={formData.postGraduation?.college || ""}
//                 onChange={(e) =>
//                   handlePostGraduationChange("college", e.target.value)
//                 }
//                 fullWidth
//               />

//               <TextField
//                 label="University Name"
//                 value={formData.postGraduation?.university || ""}
//                 onChange={(e) =>
//                   handlePostGraduationChange("university", e.target.value)
//                 }
//                 fullWidth
//               />

//               <TextField
//                 label="CGPA"
//                 value={formData.postGraduation?.cgpa || ""}
//                 onChange={(e) =>
//                   handlePostGraduationChange("cgpa", e.target.value)
//                 }
//                 fullWidth
//               />
//             </Box>
//           </>
//         )}

//         <Divider sx={{ my: 3 }} />

//         {/* Resume */}
//         <Typography variant="h6" fontWeight="700" sx={{ mb: 2 }}>
//           Resume
//         </Typography>

//         <Button variant="outlined" component="label">
//           Upload Resume

//           <input
//             hidden
//             type="file"
//             accept=".pdf,.doc,.docx"
//             onChange={handleResume}
//           />
//         </Button>

//         {formData.resume?.name && (
//           <Typography sx={{ mt: 1 }} color="text.secondary">
//             Selected: {formData.resume.name}
//           </Typography>
//         )}
//       </DialogContent>

//       <DialogActions sx={{ p: 2 }}>
//         <Button onClick={onClose} color="inherit" disabled={uploading}>
//           Cancel
//         </Button>

//         <Button
//           variant="contained"
//           onClick={handleSave}
//           disabled={uploading}
//         >
//           {uploading ? "Saving..." : "Save Changes"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditProfileDialog;
import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid, MenuItem, Typography, Divider,
} from "@mui/material";
import { convertFileToBase64 } from './ProfileStorage';

const emptyNested = {
  graduation: { college: "", university: "", cgpa: "" },
  postGraduation: { college: "", university: "", cgpa: "" },
};

export default function EditProfileDialog({ open, onClose, profile, onSave }) {
  const [form, setForm] = useState({ ...profile, ...emptyNested });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({
        ...profile,
        graduation: { ...emptyNested.graduation, ...(profile?.graduation || {}) },
        postGraduation: {
          ...emptyNested.postGraduation,
          ...(profile?.postGraduation || {}),
        },
      });
    }
  }, [open, profile]);

  const change = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("graduation.") || name.startsWith("postGraduation.")) {
      const [section, field] = name.split(".");
      setForm((old) => ({
        ...old,
        [section]: { ...old[section], [field]: value },
      }));
    } else {
      setForm((old) => ({ ...old, [name]: value }));
    }
  };

  const upload = async (event, field) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (field === "resume" && file.type !== "application/pdf") {
      alert("Please upload your resume as a PDF file.");
      event.target.value = "";
      return;
    }
    try {
      const converted = await convertFileToBase64(file);
      setForm((old) => ({ ...old, [field]: converted }));
    } catch (error) {
      alert(error.message);
    }
  };

  const submit = async () => {
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Student Profile</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Full Name" name="name" value={form.name || ""} onChange={change} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" name="email" type="email" value={form.email || ""} onChange={change} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone Number" name="number" value={form.number || ""} onChange={change} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Qualification" name="qualification" value={form.qualification || ""} onChange={change}>
              {["BCA", "B.Tech", "B.Sc", "MCA", "M.Tech", "MBA", "Other"].map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Department" name="department" placeholder="MCA / CSE / IT" value={form.department || ""} onChange={change} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Preferred Job Role" name="targetRole" placeholder="Frontend Developer" value={form.targetRole || ""} onChange={change} />
          </Grid>

          <Grid item xs={12}><Divider /><Typography fontWeight={700} sx={{ mt: 1 }}>Academic Details</Typography></Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth type="number" label="10th Percentage" name="tenth" value={form.tenth || ""} onChange={change} inputProps={{ min: 0, max: 100, step: 0.01 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth type="number" label="12th Percentage" name="twelfth" value={form.twelfth || ""} onChange={change} inputProps={{ min: 0, max: 100, step: 0.01 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth type="number" label="Current CGPA" name="cgpa" value={form.cgpa || ""} onChange={change} inputProps={{ min: 0, max: 10, step: 0.01 }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type="number" label="Current / Active Backlogs" name="currentBacklogs" value={form.currentBacklogs ?? "0"} onChange={change} inputProps={{ min: 0, step: 1 }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type="number" label="Total Backlogs (including cleared)" name="totalBacklogs" value={form.totalBacklogs ?? "0"} onChange={change} inputProps={{ min: 0, step: 1 }} />
          </Grid>

          <Grid item xs={12}><Divider /><Typography fontWeight={700} sx={{ mt: 1 }}>Graduation</Typography></Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="College" name="graduation.college" value={form.graduation?.college || ""} onChange={change} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="University" name="graduation.university" value={form.graduation?.university || ""} onChange={change} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type="number" label="Graduation CGPA" name="graduation.cgpa" value={form.graduation?.cgpa || ""} onChange={change} inputProps={{ min: 0, max: 10, step: 0.01 }} />
          </Grid>

          <Grid item xs={12}><Divider /><Typography fontWeight={700} sx={{ mt: 1 }}>Post Graduation</Typography></Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="College" name="postGraduation.college" value={form.postGraduation?.college || ""} onChange={change} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="University" name="postGraduation.university" value={form.postGraduation?.university || ""} onChange={change} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type="number" label="Post Graduation CGPA" name="postGraduation.cgpa" value={form.postGraduation?.cgpa || ""} onChange={change} inputProps={{ min: 0, max: 10, step: 0.01 }} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button component="label" variant="outlined" fullWidth>
              Upload Profile Photo
              <input hidden type="file" accept="image/*" onChange={(e) => upload(e, "profileImage")} />
            </Button>
            <Typography variant="caption" display="block">{form.profileImage?.name || "No new photo selected"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button component="label" variant="outlined" fullWidth>
              Upload Resume (PDF)
              <input hidden type="file" accept="application/pdf" onChange={(e) => upload(e, "resume")} />
            </Button>
            <Typography variant="caption" display="block">{form.resume?.name || "No resume uploaded"}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={submit} variant="contained" disabled={saving}>
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
