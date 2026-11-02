

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  Person,
  School,
  Work,
  Description,
  CloudUpload,
  Send,
  Refresh,
} from "@mui/icons-material";

const Applyform = () => {
  const initialForm = {
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    location: "",
    qualification: "",
    university: "",
    passingYear: "",
    position: "",
    experience: "",
    salary: "",
    coverLetter: "",
    remarks: "",
    fatherName: "",
    motherName: "",
    location: "",
    pincode: "",
    district: "",
    nationality: "",
    
  };

  const [form, setForm] = useState(initialForm);
  const [resume, setResume] = useState(null);
  const [graduationCompleted, setGraduationCompleted] = useState(false);
  const [postGraduationCompleted, setPostGraduationCompleted] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
  setForm(initialForm);
  setResume(null);
  setPhoto(null);
  setSignature(null);
  setGraduationCompleted(false);
  setPostGraduationCompleted(false);
};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload your resume");
      return;
    }

    console.log(form, resume);
    alert("Application submitted successfully!");
  };

  const fields = (items) =>
    items.map((item) => (
      <Grid item xs={12} sm={6} md={4} key={item.name}>
        <Typography fontWeight={600} fontSize={14} mb={1}>
          {item.label}
          {item.required && <span style={{ color: "red" }}> *</span>}
        </Typography>

        <TextField
            fullWidth
            size="small"
            name={item.name}
            type={item.type || "text"}
            value={form[item.name]}
            onChange={handleChange}
            required={item.required}
            select={!!item.options}
            placeholder={item.placeholder}
            slotProps={{
                select: {
                displayEmpty: true,
                renderValue: (selected) =>
                    selected ? (
                    selected
                    ) : (
                    <span style={{ color: "#aaa" }}>
                        {item.placeholder || `Select ${item.label}`}
                    </span>
                    ),
                },
            }}
            sx={{
                "& .MuiOutlinedInput-root": {
                borderRadius: "9px",
                backgroundColor: "#fff",
                },
            }}
            >
            {item.options?.map((option) => (
                <MenuItem key={option} value={option}>
                {option}
                </MenuItem>
            ))}
            </TextField>
      </Grid>
    ));

  const Section = ({ icon, title, children }) => (
    <Box sx={{ mt: 3 }}>
      <Box display="flex" alignItems="center" gap={1.5} mb={2.5}>
        <Box color="#635BEB">{icon}</Box>
        <Typography fontSize={19} fontWeight={700} color="#171B35">
          {title}
        </Typography>
        <Box flex={1} height="1px" bgcolor="#8178F7" />
      </Box>
      {children}
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#F7F8FF",
        py: 4,
        px: { xs: 2, md: 5 },
      }}
    >
      <Box maxWidth="1200px" mx="auto">
        {/* Heading */}
        <Box display="flex" alignItems="center" gap={3} mb={3}>
          <Box
            sx={{
              width: 65,
              height: 65,
              borderRadius: 6,
              background: "#635BEB",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              
            }}
          >
            <Work sx={{ fontSize: 35 }} />
          </Box>

          <Box>
            <Typography variant="h4" fontWeight={800} color="#171B35">
              Job Application Form
            </Typography>
            <Typography color="#68708B">
              Fill in the details below to apply for the position.
            </Typography>
          </Box>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            border: "1px solid #DDE1F0",
            borderRadius: 3,
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <Section icon={<Person fontSize="large" />} title="Personal Information">
              <Grid container spacing={3}>
                {fields([
                  { label: "First Name", name: "firstName", placeholder: "Enter your first name", required: true },
                  { label: "last Name", name: "lastName", placeholder: "Enter your last name", required: true },
                  { label: "Email Address", name: "email", type: "email", placeholder: "you@example.com", required: true },
                  { label: "Phone Number", name: "phone", type: "tel", placeholder: "+91 ", required: true },
                  { label: "Date of Birth", name: "dob", type: "date", required: true },
                  { label: "Gender", name: "gender", options: ["Male", "Female", "Other", "Prefer not to say"], required: true },
                  
                ])}
              </Grid>
            </Section>
            
            {/* Family & Address Details */}
            <Section
            icon={<Person fontSize="large" />}
            title="Family & Address Details"
            >
            <Grid container spacing={3}>
                {fields([
                {
                    label: "Father's Name",
                    name: "fatherName",
                    placeholder: "Enter father's full name",
                    required: true,
                },
                {
                    label: "Mother's Name",
                    name: "motherName",
                    placeholder: "Enter mother's full name",
                    required: true,
                },
                {
                    label: "Location / City",
                    name: "location",
                    placeholder: "Enter your city",
                    required: true,
                },
                {
                    label: "PIN Code",
                    name: "pincode",
                    placeholder: "Enter 6-digit PIN code",
                    required: true,
                },
                {
                    label: "District",
                    name: "district",
                    placeholder: "Select District",
                    options: [
                    "Kolkata",
                    "Howrah",
                    "Hooghly",
                    "North 24 Parganas",
                    "South 24 Parganas",
                    "Nadia",
                    "Murshidabad",
                    "Purba Medinipur",
                    "Paschim Medinipur",
                    "Darjeeling",
                    "Jalpaiguri",
                    "Bankura",
                    "Birbhum",
                    "Purulia",
                    "Malda",
                    "Cooch Behar",
                    "Alipurduar",
                    "Uttar Dinajpur",
                    "Dakshin Dinajpur",
                    "Jhargram",
                    "Kalimpong",
                    "Paschim Bardhaman",
                    "Purba Bardhaman",
                    ],
                    required: true,
                },
                {
                    label: "Nationality",
                    name: "nationality",
                    placeholder: "Select Nationality",
                    options: [
                    "Indian",
                    "American",
                    "British",
                    "Canadian",
                    "Australian",
                    "Other",
                    ],
                    required: true,
                },
                ])}
            </Grid>
            </Section>


            
        {/* Educational Details */}
        <Section
        icon={<School fontSize="large" />}
        title="Educational Details"
        >
        {/* 10th Details */}
        <Typography fontWeight={700} color="#5142C8" mb={2}>
            10th Standard Details
        </Typography>

        <Grid container spacing={3}>
            {fields([
            {
                label: "Board Name",
                name: "tenthBoard",
                placeholder: "e.g. WBBSE, CBSE, ICSE",
                required: true,
            },
            {
                label: "School Name",
                name: "tenthSchool",
                placeholder: "Enter school name",
                required: true,
            },
            {
                label: "Percentage / CGPA",
                name: "tenthPercentage",
                placeholder: "Enter percentage or CGPA",
                required: true,
            },
            ])}
        </Grid>

        {/* 12th Details */}
        <Typography fontWeight={700} color="#5142C8" mb={2} mt={4}>
            12th Standard Details
        </Typography>

        <Grid container spacing={3}>
            {fields([
            {
                label: "Board Name",
                name: "twelfthBoard",
                placeholder: "e.g. WBCHSE, CBSE, ISC",
                required: true,
            },
            {
                label: "School / College Name",
                name: "twelfthSchool",
                placeholder: "Enter school name ",
                required: true,
            },
            {
                label: "Percentage / CGPA",
                name: "twelfthPercentage",
                placeholder: "Enter percentage or CGPA",
                required: true,
            },
            ])}
        </Grid>

        {/* Graduation */}
        <Box mt={4}>
            <FormControlLabel
            control={
                <Checkbox
                checked={graduationCompleted}
                onChange={(e) =>
                    setGraduationCompleted(e.target.checked)
                }
                sx={{
                    color: "#635BEB",
                    "&.Mui-checked": { color: "#635BEB" },
                }}
                />
            }
            label={
                <Typography fontWeight={700} color="#5142C8">
                Graduation
                </Typography>
            }
            />
        </Box>

        {graduationCompleted && (
            <Grid container spacing={3} mt={0.5}>
            {fields([
                {
                label: "Degree",
                name: "graduationDegree",
                placeholder: "e.g. BCA, B.Tech, B.Sc",
                required: true,
                },
                {
                label: "College / University Name",
                name: "graduationCollege",
                placeholder: "Enter college name",
                required: true,
                },
                {
                label: "Percentage / CGPA",
                name: "graduationPercentage",
                placeholder: "Enter percentage or CGPA",
                required: true,
                },
            ])}
            </Grid>
        )}

        {/* Post Graduation */}
        <Box mt={3}>
            <FormControlLabel
            control={
                <Checkbox
                checked={postGraduationCompleted}
                onChange={(e) =>
                    setPostGraduationCompleted(e.target.checked)
                }
                sx={{
                    color: "#635BEB",
                    "&.Mui-checked": { color: "#635BEB" },
                }}
                />
            }
            label={
                <Typography fontWeight={700} color="#5142C8">
                 Post Graduation
                </Typography>
            }
            />
        </Box>

        {postGraduationCompleted && (
            <Grid container spacing={3} mt={0.5}>
            {fields([
                {
                label: "Post Graduation Degree",
                name: "postGraduationDegree",
                placeholder: "e.g. MCA, M.Tech, MBA",
                required: true,
                },
                {
                label: "College / University Name",
                name: "postGraduationCollege",
                placeholder: "Enter college name",
                required: true,
                },
                {
                label: "Percentage / CGPA",
                name: "postGraduationPercentage",
                placeholder: "Enter percentage or CGPA",
                required: true,
                },
            ])}
    </Grid>
    )}
</Section>


            {/* Job Details */}
            <Section icon={<Work fontSize="large" />} title="Job Details">
              <Grid container spacing={3}>
                {fields([
                  { label: "Position Applied For", name: "position", options: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "React Developer", "Java Developer", "Python Developer", "Software Engineer", "UI/UX Designer"], required: true },
                  { label: "Experience (Years)", name: "experience", placeholder: "e.g. 1-2 years" },
                  { label: "Expected Salary (Per Annum)", name: "salary", placeholder: "e.g. 6 LPA" },
                ])}
              </Grid>

              {/* Resume Upload */}

                    {/* Resume Upload */}
                    <Box mt={3} maxWidth={370}>

                    {/* Resume */}
                    <Typography fontWeight={600} fontSize={14} mb={1}>
                        Resume <span style={{ color: "red" }}>*</span>
                    </Typography>

                    <Button
                        component="label"
                        fullWidth
                        variant="outlined"
                        sx={{
                        minHeight: 110,
                        borderStyle: "dashed",
                        borderWidth: 2,
                        borderColor: "#CBD2E5",
                        color: "#635BEB",
                        textTransform: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        }}
                    >
                        <CloudUpload fontSize="large" />
                        {resume ? resume.name : "Upload your resume"}
                        <Typography fontSize={12} color="text.secondary">
                        PDF, DOC or DOCX
                        </Typography>
                        <input
                        type="file"
                        hidden
                        accept=".pdf,.doc,.docx"
                        required
                        onChange={(e) => setResume(e.target.files[0] || null)}
                        />
                    </Button>

                    {/* Profile Photo */}
                    <Typography fontWeight={600} fontSize={14} mb={1} mt={3}>
                        Profile Photo <span style={{ color: "red" }}>*</span>
                    </Typography>

                    <Button
                        component="label"
                        fullWidth
                        variant="outlined"
                        sx={{
                        minHeight: 110,
                        borderStyle: "dashed",
                        borderWidth: 2,
                        borderColor: "#CBD2E5",
                        color: "#635BEB",
                        textTransform: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        }}
                    >
                        <CloudUpload fontSize="large" />
                        {photo ? photo.name : "Upload your photo"}
                        <Typography fontSize={12} color="text.secondary">
                        JPG or PNG
                        </Typography>
                        <input
                        type="file"
                        hidden
                        accept="image/jpeg,image/png"
                        required
                        onChange={(e) => setPhoto(e.target.files[0] || null)}
                        />
                    </Button>

                    {/* Signature */}
                    <Typography fontWeight={600} fontSize={14} mb={1} mt={3}>
                        Signature <span style={{ color: "red" }}>*</span>
                    </Typography>

                    <Button
                        component="label"
                        fullWidth
                        variant="outlined"
                        sx={{
                        minHeight: 110,
                        borderStyle: "dashed",
                        borderWidth: 2,
                        borderColor: "#CBD2E5",
                        color: "#635BEB",
                        textTransform: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        }}
                    >
                        <CloudUpload fontSize="large" />
                        {signature ? signature.name : "Upload your signature"}
                        <Typography fontSize={12} color="text.secondary">
                        JPG or PNG
                        </Typography>
                        <input
                        type="file"
                        hidden
                        accept="image/jpeg,image/png"
                        required
                        onChange={(e) => setSignature(e.target.files[0] || null)}
                        />
                    </Button>

                    </Box>


            </Section>

            {/* Additional Information */}
            <Section icon={<Description fontSize="large" />} title="Additional Information">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography fontWeight={600} fontSize={14} mb={1}>
                    Cover Letter (Optional)
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    name="coverLetter"
                    value={form.coverLetter}
                    onChange={handleChange}
                    placeholder="Tell us why you are a great fit..."
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography fontWeight={600} fontSize={14} mb={1}>
                    Remarks (Optional)
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    name="remarks"
                    value={form.remarks}
                    onChange={handleChange}
                    placeholder="Any other information..."
                  />
                </Grid>
              </Grid>
            </Section>

            {/* Buttons */}
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection={{ xs: "column", sm: "row" }}
              gap={2}
              mt={4}
            >
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={handleReset}
                sx={{
                  color: "#635BEB",
                  borderColor: "#635BEB",
                  textTransform: "none",
                  px: 3,
                  py: 1.2,
                }}
              >
                Reset
              </Button>

              <Button
                type="submit"
                variant="contained"
                endIcon={<Send />}
                sx={{
                  background: "#5142C8",
                  textTransform: "none",
                  px: 3,
                  py: 1.2,
                  "&:hover": { background: "#4032AC" },
                }}
              >
                Submit Application
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Applyform;
