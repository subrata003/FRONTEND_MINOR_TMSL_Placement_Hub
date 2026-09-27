import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  TextField,
  Avatar,
  Stack,
  Divider,
  InputAdornment,
} from "@mui/material";

import {
  LocationOn,
  CalendarMonth,
  EventAvailable,
  School,
  Work,
  ArrowForward,
  Search,
  BusinessCenter,
  AccessTime,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import upcomingCompanies from "../../../public/CompanyData/upcommingCompany.js";

function Jobs() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredCompanies = upcomingCompanies.filter((company) => {
    const searchText = search.toLowerCase();

    return (
      company.company.toLowerCase().includes(searchText) ||
      company.role.toLowerCase().includes(searchText) ||
      company.location.toLowerCase().includes(searchText) ||
      company.skills.some((skill) =>
        skill.toLowerCase().includes(searchText)
      )
    );
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8faff 0%, #ffffff 45%)",
        px: { xs: 1, sm: 2, md: 3 },
        py: 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          p: { xs: 2.5, md: 4 },
          borderRadius: 4,
          background:
            "linear-gradient(135deg, #1976d2 0%, #5e35b1 100%)",
          color: "white",
          boxShadow: "0 12px 30px rgba(25, 118, 210, 0.20)",
        }}
      >
        <Box
          display="flex"
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          gap={3}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Box>
            <Box display="flex" alignItems="center" gap={1.5}>
              <BusinessCenter sx={{ fontSize: 34 }} />

              <Typography
                variant="h4"
                fontWeight={800}
                sx={{
                  fontSize: {
                    xs: "1.8rem",
                    md: "2.2rem",
                  },
                }}
              >
                Jobs & Drives
              </Typography>
            </Box>

            <Typography
              sx={{
                mt: 1,
                opacity: 0.9,
                fontSize: "0.98rem",
              }}
            >
              Explore upcoming placement opportunities and
              start your career journey.
            </Typography>
          </Box>

          <Box
            sx={{
              minWidth: 150,
              p: 2,
              borderRadius: 3,
              backgroundColor: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" fontWeight={800}>
              {filteredCompanies.length}
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              Opportunities
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Search */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <TextField
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company, role, location or skill..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                backgroundColor: "#fafafa",
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Result Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box>
          <Typography variant="h6" fontWeight={800}>
            Available Opportunities
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Find the right opportunity for your career.
          </Typography>
        </Box>

        <Chip
          label={`${filteredCompanies.length} Jobs`}
          color="primary"
          variant="outlined"
          sx={{
            fontWeight: 700,
            borderRadius: 2,
          }}
        />
      </Box>

      {/* Job Cards */}
      <Grid container spacing={3}>
        {filteredCompanies.map((company) => (
          <Grid item xs={12} md={6} key={company.id}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid #e5e7eb",
                boxShadow:
                  "0 8px 25px rgba(15, 23, 42, 0.07)",
                transition: "all 0.3s ease",

                "&:hover": {
                  transform: "translateY(-7px)",
                  boxShadow:
                    "0 18px 40px rgba(15, 23, 42, 0.13)",
                  borderColor: "primary.light",
                },
              }}
            >
              {/* Top Bar */}
              <Box
                sx={{
                  height: 6,
                  background:
                    "linear-gradient(90deg, #1976d2, #7b1fa2)",
                }}
              />

              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                {/* Company Header */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  gap={2}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        fontSize: 23,
                        fontWeight: 800,
                        background:
                          "linear-gradient(135deg, #1976d2, #7b1fa2)",
                        boxShadow:
                          "0 6px 15px rgba(25,118,210,0.25)",
                      }}
                    >
                      {company.logo}
                    </Avatar>

                    <Box>
                      <Typography variant="h6" fontWeight={800}>
                        {company.company}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {company.role}
                      </Typography>
                    </Box>
                  </Box>

                  <Chip
                    label={company.status}
                    size="small"
                    color={
                      company.status === "Open"
                        ? "success"
                        : "default"
                    }
                    sx={{
                      fontWeight: 700,
                      borderRadius: 2,
                    }}
                  />
                </Box>

                <Divider sx={{ my: 2.5 }} />

                {/* Details */}
                <Stack spacing={1.5}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#e3f2fd",
                      }}
                    >
                      <LocationOn
                        fontSize="small"
                        color="primary"
                      />
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Location
                      </Typography>

                      <Typography
                        variant="body2"
                        fontWeight={600}
                      >
                        {company.location}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f3e5f5",
                      }}
                    >
                      <Work
                        fontSize="small"
                        sx={{ color: "#7b1fa2" }}
                      />
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Employment
                      </Typography>

                      <Typography
                        variant="body2"
                        fontWeight={600}
                      >
                        {company.type} • {company.experience}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#fff3e0",
                      }}
                    >
                      <School
                        fontSize="small"
                        sx={{ color: "#ef6c00" }}
                      />
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Eligibility
                      </Typography>

                      <Typography
                        variant="body2"
                        fontWeight={600}
                      >
                        {company.eligibility}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>

                {/* Package */}
                <Box
                  sx={{
                    mt: 2.5,
                    p: 2,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, #ecfdf5, #f0fdf4)",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    PACKAGE
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={800}
                    color="success.dark"
                  >
                    {company.package}
                  </Typography>
                </Box>

                {/* Dates */}
                <Grid container spacing={1.5} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2.5,
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={0.7}
                      >
                        <CalendarMonth
                          fontSize="small"
                          color="primary"
                        />

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          Drive Date
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        fontWeight={700}
                        mt={0.5}
                      >
                        {company.driveDate}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2.5,
                        backgroundColor: "#fff7ed",
                      }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={0.7}
                      >
                        <AccessTime
                          fontSize="small"
                          sx={{ color: "#ea580c" }}
                        />

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          Apply Before
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        fontWeight={700}
                        color="error.main"
                        mt={0.5}
                      >
                        {company.lastDate}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* CGPA */}
                <Box
                  sx={{
                    mt: 2,
                    p: 1.5,
                    borderRadius: 2.5,
                    backgroundColor: "#f5f3ff",
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Minimum CGPA
                  </Typography>

                  <Typography
                    variant="h6"
                    fontWeight={800}
                    sx={{ color: "#6d28d9" }}
                  >
                    {company.minCGPA}
                  </Typography>
                </Box>

                {/* Skills */}
                <Box mt={2.5}>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    mb={1}
                  >
                    Required Skills
                  </Typography>

                  <Box
                    display="flex"
                    gap={1}
                    flexWrap="wrap"
                  >
                    {company.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderRadius: 2,
                          fontWeight: 600,
                          backgroundColor: "#fafafa",
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Button */}
                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={() =>
                    navigate(`/student/jobs/${company.id}`)
                  }
                  sx={{
                    mt: 3,
                    py: 1.4,
                    borderRadius: 2.5,
                    textTransform: "none",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    background:
                      "linear-gradient(135deg, #1976d2, #5e35b1)",
                    boxShadow:
                      "0 6px 15px rgba(25,118,210,0.25)",

                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #1565c0, #4527a0)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  View Job Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Result */}
      {filteredCompanies.length === 0 && (
        <Card
          sx={{
            mt: 3,
            py: 8,
            textAlign: "center",
            borderRadius: 4,
            border: "1px solid #e5e7eb",
            boxShadow: "none",
          }}
        >
          <BusinessCenter
            sx={{
              fontSize: 55,
              color: "text.disabled",
              mb: 1,
            }}
          />

          <Typography
            variant="h6"
            fontWeight={700}
            color="text.secondary"
          >
            No placement opportunities found
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={1}
          >
            Try searching with another company, role,
            location or skill.
          </Typography>
        </Card>
      )}
    </Box>
  );
}

export default Jobs;