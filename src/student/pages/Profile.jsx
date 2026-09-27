import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
} from "@mui/material";

function Profile() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        My Profile
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Manage your personal, academic and professional information.
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            mb={4}
          >
            <Avatar
              sx={{
                width: 75,
                height: 75,
                bgcolor: "#2563eb",
                fontSize: 28,
              }}
            >
              S
            </Avatar>

            <Box>
              <Typography variant="h6" fontWeight="bold">
                Sourav Ghosh
              </Typography>

              <Typography color="text.secondary">
                MCA Student
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                defaultValue="Sourav Ghosh"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                defaultValue="sourav@example.com"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                defaultValue="+91 XXXXX XXXXX"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Course"
                defaultValue="MCA"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="College"
                defaultValue="Techno Main Salt Lake"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="CGPA"
                defaultValue="7.70"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skills"
                defaultValue="React, JavaScript, Node.js, Express.js, MongoDB, Java"
              />
            </Grid>
          </Grid>

          <Box mt={4}>
            <Button variant="contained">
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 3, mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            Resume
          </Typography>

          <Typography
            color="text.secondary"
            mt={1}
            mb={2}
          >
            Upload your latest resume.
          </Typography>

          <Button variant="outlined" component="label">
            Upload Resume
            <input hidden type="file" accept=".pdf,.doc,.docx" />
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Profile;