
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

// Reusable input field
const FormField = ({ item, value, onChange }) => (
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <Typography fontWeight={600} fontSize={14} mb={1}>
      {item.label}
      {item.required && <span style={{ color: "red" }}> *</span>}
    </Typography>

    <TextField
      fullWidth
      size="small"
      name={item.name}
      type={item.type || "text"}
      value={value || ""}
      onChange={onChange}
      required={item.required}
      select={!!item.options}
      placeholder={item.placeholder}
      slotProps={
        item.options
          ? {
              select: {
                displayEmpty: true,
                renderValue: (selected) =>
                  selected || (
                    <span style={{ color: "#aaa" }}>
                      {item.placeholder || `Select ${item.label}`}
                    </span>
                  ),
              },
            }
          : undefined
      }
      InputLabelProps={
        item.type === "date" ? { shrink: true } : undefined
      }
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "9px",
          backgroundColor: "#fff",
          fontSize: "14px",
          "& fieldset": {
            borderColor: "#CBD2E5",
          },
          "&:hover fieldset": {
            borderColor: "#635BEB",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#635BEB",
          },
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
);

// Section heading
const Section = ({ icon, title, children }) => (
  <Box sx={{ mt: 3, mb: 3 }}>

    <Box
      sx={{
        display: "flex !important",
        flexDirection: "row !important",
        alignItems: "center !important",
        gap: 1.5,
        mb: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          color: "#635BEB",
        }}
      >
        {icon}
      </Box>

      <Typography
        sx={{
          fontSize: 19,
          fontWeight: 700,
          color: "#171B35",
          lineHeight: 1.4,
        }}
      >
        {title}
      </Typography>
    </Box>

    <Box
      sx={{
        height: "1px",
        width: "100%",
        backgroundColor: "#8178F7",
        mb: 2,
      }}
    />

    {children}
  </Box>
);

// Upload component

const UploadField = ({
  label,
  file,
  setFile,
  accept,
  description,
}) => (
  <Box sx={{ mt: 2.5, width: "100%" }}>
    <Typography
      fontWeight={600}
      fontSize={14}
      color="#252442"
      mb={1}
    >
      {label} <span style={{ color: "red" }}>*</span>
    </Typography>

    <Button
      component="label"
      fullWidth
      variant="outlined"
      sx={{
        minHeight: 105,
        border: "1.5px dashed #C9CFE5",
        borderRadius: "10px",
        backgroundColor: "#FAFAFF",
        color: "#635BEB",
        textTransform: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.8,
        transition: "all 0.2s ease",

        "&:hover": {
          border: "1.5px dashed #635BEB",
          backgroundColor: "#F4F2FF",
        },
      }}
    >
      <CloudUpload sx={{ fontSize: 30 }} />

      <Typography fontSize={14} fontWeight={600}>
        {file ? file.name : `Upload your ${label.toLowerCase()}`}
      </Typography>

      <Typography fontSize={12} color="text.secondary">
        {description}
      </Typography>

      <input
        type="file"
        hidden
        accept={accept}
        required={!file}
        onChange={(e) => setFile(e.target.files[0] || null)}
      />
    </Button>
  </Box>
);


const JobApplication = () => {
  const initialForm = {
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",

    // Family and Address
    fatherName: "",
    motherName: "",
    location: "",
    pincode: "",
    district: "",
    nationality: "",

    // Education
    tenthBoard: "",
    tenthSchool: "",
    tenthPercentage: "",

    twelfthBoard: "",
    twelfthSchool: "",
    twelfthPercentage: "",

    graduationDegree: "",
    graduationCollege: "",
    graduationPercentage: "",

    postGraduationDegree: "",
    postGraduationCollege: "",
    postGraduationPercentage: "",

    // Job
    position: "",
    experience: "",
    salary: "",

    // Additional
    coverLetter: "",
    remarks: "",
  };

  const [form, setForm] = useState(initialForm);

  const [graduationCompleted, setGraduationCompleted] =
    useState(false);

  const [postGraduationCompleted, setPostGraduationCompleted] =
    useState(false);

  const [resume, setResume] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = () => {
    setForm(initialForm);
    setGraduationCompleted(false);
    setPostGraduationCompleted(false);
    setResume(null);
    setPhoto(null);
    setSignature(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!resume || !photo || !signature) {
      alert("Please upload your resume, photo and signature.");
      return;
    }

    const applicationData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      applicationData.append(key, value);
    });

    applicationData.append("resume", resume);
    applicationData.append("photo", photo);
    applicationData.append("signature", signature);

    console.log("Application Data:", form);
    console.log("Uploaded Files:", {
      resume,
      photo,
      signature,
    });

    alert("Application submitted successfully!");
  };

  const renderFields = (items) =>
    items.map((item) => (
      <FormField
        key={item.name}
        item={item}
        value={form[item.name]}
        onChange={handleChange}
      />
    ));

  return (
    <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#F4F5FC",
          pt: 0,
          pb: 4,
          px: { xs: 2, md: 5 },
        }}
      >
      <Box maxWidth="1200px" mx="auto">


{/* PAGE HEADER */}
<Box
  sx={{
    display: "flex !important",
    flexDirection: "row !important",
    alignItems: "center !important",
    justifyContent: "flex-start",
    gap: "16px",
    width: "100%",
    mb: 3,
  }}
>
  {/* Briefcase Icon */}
  <Box
    sx={{
      width: "65px",
      height: "65px",
      minWidth: "65px",
      backgroundColor: "#635BEB",
      borderRadius: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Work sx={{ fontSize: 35, color: "#FFFFFF" }} />
  </Box>

  {/* Heading and Subtitle */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
    }}
  >
    <Typography
      sx={{
        fontSize: "30px",
        fontWeight: 700,
        color: "#171B35",
        lineHeight: 1.3,
        margin: 0,
      }}
    >
      Job Application Form
    </Typography>

    <Typography
      sx={{
        fontSize: "14px",
        color: "#68708B",
        marginTop: "5px",
      }}
    >
      Fill in the details below to apply for the position.
    </Typography>
  </Box>
</Box>


        <Paper
            elevation={0}
            sx={{
              display: "flex",
              p: { xs: 2, md: 4 },
              border: "1px solid #E0E3F2",
              borderRadius: "14px",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 4px 20px rgba(178, 178, 180, 0.04)",
            }}
          >
          <Box component="form" onSubmit={handleSubmit}>

            {/* 1. Personal Information */}
            <Section
              icon={<Person fontSize="large" />}
              title="Personal Information"
            >
              <Grid container spacing={3}>
                {renderFields([
                  {
                    label: "Full Name",
                    name: "fullName",
                    placeholder: "Enter your full name",
                    required: true,
                  },
                  {
                    label: "Email Address",
                    name: "email",
                    type: "email",
                    placeholder: "you@example.com",
                    required: true,
                  },
                  {
                    label: "Phone Number",
                    name: "phone",
                    type: "tel",
                    placeholder: "+91 0000000000",
                    required: true,
                  },
                  {
                    label: "Date of Birth",
                    name: "dob",
                    type: "date",
                    required: true,
                  },
                  {
                    label: "Gender",
                    name: "gender",
                    placeholder: "Select Gender",
                    options: [
                      "Male",
                      "Female",
                      "Other",
                      "Prefer not to say",
                    ],
                    required: true,
                  },
                ])}
              </Grid>
            </Section>

            {/* 2. Family and Address Details */}
            <Section
              icon={<Person fontSize="large" />}
              title="Family & Address Details"
            >
              <Grid container spacing={3}>
                {renderFields([
                  {
                    label: "Father's Name",
                    name: "fatherName",
                    placeholder: "Enter father's name",
                    required: true,
                  },
                  {
                    label: "Mother's Name",
                    name: "motherName",
                    placeholder: "Enter mother's name",
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
  {/* 10th Standard */}
  <Box sx={{ mb: 4 }}>
    <Typography
      sx={{
        fontSize: 16,
        fontWeight: 700,
        color: "#5142C8",
        mb: 2,
      }}
    >
      10th Standard Details
    </Typography>

    <Grid container spacing={3}>
      {renderFields([
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
  </Box>

  <Box
    sx={{
      height: "1px",
      backgroundColor: "#EAECF5",
      mb: 3,
    }}
  />

  {/* 12th Standard */}
  <Box sx={{ mb: 4 }}>
    <Typography
      sx={{
        fontSize: 16,
        fontWeight: 700,
        color: "#5142C8",
        mb: 2,
      }}
    >
      12th Standard Details
    </Typography>

    <Grid container spacing={3}>
      {renderFields([
        {
          label: "Board Name",
          name: "twelfthBoard",
          placeholder: "e.g. WBCHSE, CBSE, ISC",
          required: true,
        },
        {
          label: "School / College Name",
          name: "twelfthSchool",
          placeholder: "Enter school or college name",
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
  </Box>

  <Box
    sx={{
      height: "1px",
      backgroundColor: "#EAECF5",
      mb: 3,
    }}
  />

  {/* Graduation */}
  <Box sx={{ mb: 3 }}>
    <Box
      sx={{
        backgroundColor: "#F8F7FF",
        border: "1px solid #E5E2FF",
        borderRadius: "10px",
        px: 2,
        py: 1,
      }}
    >
      <FormControlLabel
        sx={{ m: 0 }}
        control={
          <Checkbox
            checked={graduationCompleted}
            onChange={(e) => {
              setGraduationCompleted(e.target.checked);

              if (!e.target.checked) {
                setForm((prev) => ({
                  ...prev,
                  graduationDegree: "",
                  graduationCollege: "",
                  graduationPercentage: "",
                }));
              }
            }}
            sx={{
              color: "#635BEB",
              "&.Mui-checked": {
                color: "#635BEB",
              },
            }}
          />
        }
        label={
          <Typography fontWeight={600} color="#252442">
            Graduation Details
          </Typography>
        }
      />
    </Box>

    {graduationCompleted && (
      <Box mt={2}>
        <Grid container spacing={3}>
          {renderFields([
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
      </Box>
    )}
  </Box>

  {/* Post Graduation */}
  <Box>
    <Box
      sx={{
        backgroundColor: "#F8F7FF",
        border: "1px solid #E5E2FF",
        borderRadius: "10px",
        px: 2,
        py: 1,
      }}
    >
      <FormControlLabel
        sx={{ m: 0 }}
        control={
          <Checkbox
            checked={postGraduationCompleted}
            onChange={(e) => {
              setPostGraduationCompleted(e.target.checked);

              if (!e.target.checked) {
                setForm((prev) => ({
                  ...prev,
                  postGraduationDegree: "",
                  postGraduationCollege: "",
                  postGraduationPercentage: "",
                }));
              }
            }}
            sx={{
              color: "#635BEB",
              "&.Mui-checked": {
                color: "#635BEB",
              },
            }}
          />
        }
        label={
          <Typography fontWeight={600} color="#252442">
            Post Graduation Details
          </Typography>
        }
      />
    </Box>

    {postGraduationCompleted && (
      <Box mt={2}>
        <Grid container spacing={3}>
          {renderFields([
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
      </Box>
    )}
  </Box>
</Section>


            {/* 4. Job Details */}
            <Section
              icon={<Work fontSize="large" />}
              title="Job Details"
            >
              <Grid container spacing={3}>
  {renderFields([
    {
      label: "Position Applied For",
      name: "position",
      placeholder: "Select Position",
      options: [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "React Developer",
        "Java Developer",
        "Python Developer",
        "Software Engineer",
        "UI/UX Designer",
      ],
      required: true,
    },
    {
      label: "Experience (Years)",
      name: "experience",
      placeholder: "e.g. 1-2 years (optional)",
    },
    {
      label: "Expected Salary (Per Annum)",
      name: "salary",
      placeholder: "e.g. 6 LPA (optional)",
    },
  ])}
</Grid>

              {/* Uploads - One After Another */}
              <UploadField
                label="Resume"
                file={resume}
                setFile={setResume}
                accept=".pdf,.doc,.docx"
                description="PDF, DOC or DOCX"
              />

              <UploadField
                label="Profile Photo"
                file={photo}
                setFile={setPhoto}
                accept="image/jpeg,image/png"
                description="JPG or PNG (Passport Size)"
              />

              <UploadField
                label="Signature"
                file={signature}
                setFile={setSignature}
                accept="image/jpeg,image/png"
                description="JPG or PNG"
              />
            </Section>

           
{/* 5. Additional Information */}
<Section
  icon={<Description fontSize="large" />}
  title="Additional Information"
>
  <Grid container spacing={3}>
    {/* Cover Letter */}
    <Grid size={{ xs: 12, md: 6 }}>
      <Typography
        fontWeight={600}
        fontSize={14}
        color="#252442"
        mb={1}
      >
        Cover Letter
        <Typography
          component="span"
          fontSize={12}
          color="text.secondary"
          ml={1}
        >
          (Optional)
        </Typography>
      </Typography>

      <TextField
        fullWidth
        multiline
        minRows={3}
        maxRows={6}
        name="coverLetter"
        value={form.coverLetter}
        onChange={handleChange}
        placeholder="Tell us why you are a great fit for this position..."
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
            fontSize: 14,
            "& fieldset": {
              borderColor: "#CBD2E5",
            },
            "&:hover fieldset": {
              borderColor: "#635BEB",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#635BEB",
            },
          },
        }}
      />
    </Grid>

    {/* Remarks */}
    <Grid size={{ xs: 12, md: 6 }}>
      <Typography
        fontWeight={600}
        fontSize={14}
        color="#252442"
        mb={1}
      >
        Remarks
        <Typography
          component="span"
          fontSize={12}
          color="text.secondary"
          ml={1}
        >
          (Optional)
        </Typography>
      </Typography>

      <TextField
        fullWidth
        multiline
        minRows={3}
        maxRows={6}
        name="remarks"
        value={form.remarks}
        onChange={handleChange}
        placeholder="Add any other information you would like us to know..."
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
            fontSize: 14,
            "& fieldset": {
              borderColor: "#CBD2E5",
            },
            "&:hover fieldset": {
              borderColor: "#635BEB",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#635BEB",
            },
          },
        }}
      />
    </Grid>
  </Grid>
</Section>

{/* Action Buttons */}
<Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 2,
    mt: 4,
    pt: 3,
    borderTop: "1px solid #EAECF5",
    flexWrap: "wrap",
  }}
>
  <Button
    variant="outlined"
    startIcon={<Refresh />}
    onClick={handleReset}
    sx={{
      minWidth: 120,
      py: 1.2,
      px: 3,
      borderRadius: "9px",
      borderColor: "#635BEB",
      color: "#635BEB",
      fontWeight: 600,
      textTransform: "none",
      "&:hover": {
        borderColor: "#5142C8",
        backgroundColor: "#F5F3FF",
      },
    }}
  >
    Reset
  </Button>

  <Button
    type="submit"
    variant="contained"
    endIcon={<Send />}
    sx={{
      minWidth: 190,
      py: 1.2,
      px: 3,
      borderRadius: "9px",
      backgroundColor: "#5142C8",
      fontWeight: 600,
      textTransform: "none",
      boxShadow: "0 3px 8px rgba(81, 66, 200, 0.2)",
      "&:hover": {
        backgroundColor: "#4032AC",
        boxShadow: "0 4px 12px rgba(81, 66, 200, 0.3)",
      },
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

export default JobApplication;
