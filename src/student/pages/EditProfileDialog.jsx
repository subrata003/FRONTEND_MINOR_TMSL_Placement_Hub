import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";

const EditProfileDialog = ({
  open,
  onClose,
  profile,
  onSave,
}) => {
  const [formData, setFormData] = useState(profile);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGraduationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      graduation: {
        ...prev.graduation,
        [field]: value,
      },
    }));
  };

  const handlePostGraduationChange = (
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      postGraduation: {
        ...prev.postGraduation,
        [field]: value,
      },
    }));
  };

  // Profile Image
  const handleProfileImage = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    handleChange("profileImage", imageUrl);
  };

  // Resume
  const handleResume = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    handleChange("resume", file);
  };

  const saveProfile = () => {
    onSave(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Typography
          variant="h5"
          fontWeight="700"
        >
          Edit Profile
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Update your personal and academic information.
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        {/* Profile Image */}
        <Typography
          variant="h6"
          fontWeight="700"
          sx={{ mb: 2 }}
        >
          Profile Image
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            mb: 3,
          }}
        >
          <Avatar
            src={formData.profileImage}
            sx={{
              width: 90,
              height: 90,
              bgcolor: "#2563eb",
              fontSize: 30,
            }}
          >
            {!formData.profileImage &&
              formData.name?.charAt(0)?.toUpperCase()}
          </Avatar>

          <Button
            variant="outlined"
            component="label"
          >
            Change Image

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleProfileImage}
            />
          </Button>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Personal Details */}
        <Typography
          variant="h6"
          fontWeight="700"
          sx={{ mb: 2 }}
        >
          Personal Details
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2, 1fr)",
            gap: 2,
          }}
        >
          <TextField
            label="Full Name"
            value={formData.name}
            onChange={(e) =>
              handleChange(
                "name",
                e.target.value
              )
            }
            fullWidth
          />

          <TextField
            label="Email ID"
            type="email"
            value={formData.email}
            onChange={(e) =>
              handleChange(
                "email",
                e.target.value
              )
            }
            fullWidth
          />

          <TextField
            label="Phone Number"
            value={formData.number}
            onChange={(e) =>
              handleChange(
                "number",
                e.target.value
              )
            }
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>
              Current Qualification
            </InputLabel>

            <Select
              value={formData.qualification}
              label="Current Qualification"
              onChange={(e) =>
                handleChange(
                  "qualification",
                  e.target.value
                )
              }
            >
              <MenuItem value="BCA">
                BCA
              </MenuItem>

              <MenuItem value="B.Tech">
                B.Tech
              </MenuItem>

              <MenuItem value="MCA">
                MCA
              </MenuItem>

              <MenuItem value="M.Tech">
                M.Tech
              </MenuItem>

              <MenuItem value="MBA">
                MBA
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Academic */}
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
              "repeat(3, 1fr)",
            gap: 2,
          }}
        >
          <TextField
            label="10th Percentage"
            value={formData.tenth}
            onChange={(e) =>
              handleChange(
                "tenth",
                e.target.value
              )
            }
          />

          <TextField
            label="12th Percentage"
            value={formData.twelfth}
            onChange={(e) =>
              handleChange(
                "twelfth",
                e.target.value
              )
            }
          />

          <TextField
            label="Current CGPA"
            value={formData.cgpa}
            onChange={(e) =>
              handleChange(
                "cgpa",
                e.target.value
              )
            }
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Graduation */}
        <Typography
          variant="h6"
          fontWeight="700"
          sx={{ mb: 2 }}
        >
          Graduation Details
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, 1fr)",
            gap: 2,
          }}
        >
          <TextField
            label="College Name"
            value={
              formData.graduation.college
            }
            onChange={(e) =>
              handleGraduationChange(
                "college",
                e.target.value
              )
            }
          />

          <TextField
            label="University Name"
            value={
              formData.graduation.university
            }
            onChange={(e) =>
              handleGraduationChange(
                "university",
                e.target.value
              )
            }
          />

          <TextField
            label="CGPA"
            value={
              formData.graduation.cgpa
            }
            onChange={(e) =>
              handleGraduationChange(
                "cgpa",
                e.target.value
              )
            }
          />
        </Box>

        {/* Post Graduation */}
        {formData.qualification === "MCA" ||
        formData.qualification === "M.Tech" ||
        formData.qualification === "MBA" ? (
          <>
            <Typography
              variant="h6"
              fontWeight="700"
              sx={{ mt: 3, mb: 2 }}
            >
              Post Graduation Details
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3, 1fr)",
                gap: 2,
              }}
            >
              <TextField
                label="College Name"
                value={
                  formData.postGraduation
                    .college
                }
                onChange={(e) =>
                  handlePostGraduationChange(
                    "college",
                    e.target.value
                  )
                }
              />

              <TextField
                label="University Name"
                value={
                  formData.postGraduation
                    .university
                }
                onChange={(e) =>
                  handlePostGraduationChange(
                    "university",
                    e.target.value
                  )
                }
              />

              <TextField
                label="CGPA"
                value={
                  formData.postGraduation
                    .cgpa
                }
                onChange={(e) =>
                  handlePostGraduationChange(
                    "cgpa",
                    e.target.value
                  )
                }
              />
            </Box>
          </>
        ) : null}

        <Divider sx={{ my: 3 }} />

        {/* Resume */}
        <Typography
          variant="h6"
          fontWeight="700"
          sx={{ mb: 2 }}
        >
          Resume
        </Typography>

        <Button
          variant="outlined"
          component="label"
        >
          Upload Resume

          <input
            hidden
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResume}
          />
        </Button>

        {formData.resume && (
          <Typography
            sx={{ mt: 1 }}
            color="text.secondary"
          >
            Selected: {formData.resume.name}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          color="inherit"
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={saveProfile}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;