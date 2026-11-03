import upcomingCompanies from '../../../public/CompanyData/upcommingCompany.js'

import React, { useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Avatar,
} from "@mui/material";

import {
  EmojiEvents,
  Business,
  CheckCircle,
  Schedule,
  Cancel,
  Search,
  Visibility,
  TrendingUp,
  LocationOn,
  CalendarMonth,
  Close,
  Work,
  School,
} from "@mui/icons-material";


const Results = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Existing company data
  const companies = upcomingCompanies;

  // Result counts
  // Connect these values to actual application data later.
  const total = companies.length;
  const published = 0;
  const pending = total;
  const rejected = 0;

  // Summary Cards
  const summaryCards = [
    {
      title: "Total Applications",
      count: total,
      icon: <Business />,
      color: "#2563EB",
      bg: "#EFF6FF",
      border: "#BFDBFE",
    },
    {
      title: "Results Published",
      count: published,
      icon: <CheckCircle />,
      color: "#16A34A",
      bg: "#DCFCE7",
      border: "#BBF7D0",
    },
    {
      title: "Pending",
      count: pending,
      icon: <Schedule />,
      color: "#D97706",
      bg: "#FEF3C7",
      border: "#FDE68A",
    },
    {
      title: "Rejected",
      count: rejected,
      icon: <Cancel />,
      color: "#DC2626",
      bg: "#FEE2E2",
      border: "#FECACA",
    },
  ];

  // Search and filter
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.company.toLowerCase().includes(search.toLowerCase()) ||
      company.role.toLowerCase().includes(search.toLowerCase()) ||
      company.location.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Open" && company.status === "Open") ||
      (filter === "Closed" && company.status !== "Open");

    return matchesSearch && matchesFilter;
  });

  return (
    <Box
  sx={{
    minHeight: "100vh",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#F4F5FC",
    p: {
      xs: 2,
      sm: 3,
      md: 4,
    },
  }}
>
      
{/* PAGE HEADER */}
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 2,
    mb: 3.5,
  }}
>
  <Box
    sx={{
      width: 60,
      height: 60,
      minWidth: 60,
      borderRadius: "16px",
      background: "linear-gradient(135deg, #7167F9, #5145D9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 5px 14px rgba(99,91,235,0.20)",
    }}
  >
    <EmojiEvents sx={{ color: "#fff", fontSize: 32 }} />
  </Box>

  <Box>
    <Typography
      sx={{
        fontSize: { xs: 22, md: 27 },
        fontWeight: 750,
        color: "#172554",
        letterSpacing: "-0.6px",
        lineHeight: 1.3,
      }}
    >
      My Placement Results
    </Typography>

    <Typography
      sx={{
        fontSize: 14,
        color: "#64748B",
        mt: 0.5,
      }}
    >
      Track your placement progress and interview outcomes.
    </Typography>
  </Box>
</Box>


      {/* SUMMARY CARDS */}
      <Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      lg: "repeat(4, 1fr)",
    },
    gap: 2.5,
    mb: 3.5,
    alignItems: "stretch",
  }}
>
        {summaryCards.map((card) => (
          <Card
            key={card.title}
            elevation={0}
            sx={{
              border: `1px solid ${card.border}`,
              borderRadius: "15px",
              transition: "0.25s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
              },
            }}
          >
            <CardContent
              sx={{
                p: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                "&:last-child": { pb: 2.5 },
              }}
            >
              <Box>
                <Typography
                  fontSize={13}
                  fontWeight={600}
                  color="#64748B"
                >
                  {card.title}
                </Typography>

                <Typography
                  fontSize={30}
                  fontWeight={700}
                  color="#172554"
                  mt={1}
                >
                  {String(card.count).padStart(2, "0")}
                </Typography>
              </Box>

              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: "13px",
                  backgroundColor: card.bg,
                  color: card.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {React.cloneElement(card.icon, {
                  sx: { fontSize: 28 },
                })}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* PLACEMENT PROGRESS */}
      <Card
        elevation={0}
        sx={{
          border: "1px solid #E5E7F0",
          borderRadius: "15px",
          mb: 3,
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>

          <Box display="flex" alignItems="center" gap={1.5} mb={3}>
            <Avatar
              sx={{
                width: 44,
                height: 44,
                backgroundColor: "#EEF0FF",
                color: "#635BEB",
              }}
            >
              <TrendingUp />
            </Avatar>

            <Box>
              <Typography fontSize={18} fontWeight={700} color="#172554">
                Placement Progress
              </Typography>

              <Typography fontSize={13} color="#64748B">
                Your overall placement performance
              </Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography fontSize={14} fontWeight={600} color="#475569">
              Results Published
            </Typography>

            <Typography fontSize={15} fontWeight={700} color="#16A34A">
              {published} / {total}
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={total ? (published / total) * 100 : 0}
            sx={{
              height: 11,
              borderRadius: 10,
              backgroundColor: "#E9ECF4",
              mb: 3,
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#16A34A",
                borderRadius: 10,
              },
            }}
          />

          {/* PROGRESS STATUS */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(3, 1fr)",
              },
              gap: 2,
            }}
          >
            {[
              {
                label: "Published",
                count: published,
                color: "#16A34A",
                bg: "#DCFCE7",
              },
              {
                label: "Pending",
                count: pending,
                color: "#D97706",
                bg: "#FEF3C7",
              },
              {
                label: "Rejected",
                count: rejected,
                color: "#DC2626",
                bg: "#FEE2E2",
              },
            ].map((item) => (
              <Box
                key={item.label}
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  backgroundColor: item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  fontSize={14}
                  fontWeight={600}
                  color={item.color}
                >
                  {item.label}
                </Typography>

                <Typography
                  fontSize={19}
                  fontWeight={700}
                  color={item.color}
                >
                  {String(item.count).padStart(2, "0")}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* COMPANY WISE RESULTS */}
      <Card
        elevation={0}
        sx={{
          border: "1px solid #E5E7F0",
          borderRadius: "15px",
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>

          {/* SECTION HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
            mb={3}
          >
            <Box>
              <Typography fontSize={19} fontWeight={700} color="#172554">
                Company-wise Results
              </Typography>

              <Typography fontSize={13} color="#64748B" mt={0.5}>
                Check company details and placement updates.
              </Typography>
            </Box>

            <Box
              display="flex"
              gap={1.5}
              width={{ xs: "100%", md: "auto" }}
            >
              <TextField
                size="small"
                placeholder="Search company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ flex: 1, minWidth: 150 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                select
                size="small"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </TextField>
            </Box>
          </Box>

          {/* TABLE */}
          <Box sx={{ overflowX: "auto" }}>
            <Box sx={{ minWidth: 750 }}>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1.5fr 1fr 1fr 1.1fr 0.8fr",
                  gap: 1,
                  p: 2,
                  backgroundColor: "#F7F8FC",
                  borderRadius: "9px",
                }}
              >
                {[
                  "Company",
                  "Job Role",
                  "Package",
                  "Location",
                  "Drive Date",
                  "Action",
                ].map((heading) => (
                  <Typography
                    key={heading}
                    fontSize={12}
                    fontWeight={700}
                    color="#475569"
                  >
                    {heading}
                  </Typography>
                ))}
              </Box>

              {filteredCompanies.map((company) => (
                <Box
                  key={company.id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1.1fr 1.5fr 1fr 1fr 1.1fr 0.8fr",
                    gap: 1,
                    alignItems: "center",
                    p: 2,
                    borderBottom: "1px solid #EEF0F5",
                    "&:hover": {
                      backgroundColor: "#FAFAFF",
                    },
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar
                      sx={{
                        width: 35,
                        height: 35,
                        borderRadius: "9px",
                        backgroundColor: "#EEF0FF",
                        color: "#635BEB",
                        fontWeight: 700,
                        fontSize: 15,
                      }}
                    >
                      {company.logo}
                    </Avatar>

                    <Typography fontSize={13} fontWeight={700}>
                      {company.company}
                    </Typography>
                  </Box>

                  <Typography fontSize={12} color="#475569">
                    {company.role}
                  </Typography>

                  <Typography fontSize={13} fontWeight={600}>
                    {company.package}
                  </Typography>

                  <Typography fontSize={12} color="#64748B">
                    {company.location}
                  </Typography>

                  <Typography fontSize={12} color="#64748B">
                    {company.driveDate}
                  </Typography>

                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => setSelectedCompany(company)}
                    sx={{
                      color: "#635BEB",
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    View
                  </Button>
                </Box>
              ))}

              {filteredCompanies.length === 0 && (
                <Box textAlign="center" py={5}>
                  <Typography color="text.secondary">
                    No companies found.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* COMPANY DETAILS DIALOG */}
      <Dialog
        open={Boolean(selectedCompany)}
        onClose={() => setSelectedCompany(null)}
        fullWidth
        maxWidth="sm"
      >
        {selectedCompany && (
          <>
            <DialogTitle
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              Company Details

              <Button
                onClick={() => setSelectedCompany(null)}
                color="inherit"
                sx={{ minWidth: "auto" }}
              >
                <Close />
              </Button>
            </DialogTitle>

            <DialogContent dividers>

              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Avatar
                  sx={{
                    width: 55,
                    height: 55,
                    backgroundColor: "#EEF0FF",
                    color: "#635BEB",
                    fontWeight: 700,
                    fontSize: 24,
                  }}
                >
                  {selectedCompany.logo}
                </Avatar>

                <Box>
                  <Typography fontSize={20} fontWeight={700}>
                    {selectedCompany.company}
                  </Typography>

                  <Typography fontSize={13} color="text.secondary">
                    {selectedCompany.role}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {[
                ["Package", selectedCompany.package],
                ["Location", selectedCompany.location],
                ["Drive Date", selectedCompany.driveDate],
                ["Last Date", selectedCompany.lastDate],
                ["Job Type", selectedCompany.type],
                ["Eligibility", selectedCompany.eligibility],
                ["Minimum CGPA", selectedCompany.minCGPA],
                ["Experience", selectedCompany.experience],
              ].map(([label, value]) => (
                <Box
                  key={label}
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  py={1.2}
                  borderBottom="1px solid #EEF0F5"
                >
                  <Typography fontSize={13} color="#64748B">
                    {label}
                  </Typography>

                  <Typography
                    fontSize={13}
                    fontWeight={600}
                    textAlign="right"
                  >
                    {value}
                  </Typography>
                </Box>
              ))}

              <Typography fontSize={14} fontWeight={700} mt={3} mb={1.5}>
                Required Skills
              </Typography>

              <Box display="flex" gap={1} flexWrap="wrap">
                {selectedCompany.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    sx={{
                      backgroundColor: "#EEF0FF",
                      color: "#5142C8",
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Box>

              <Box
                mt={3}
                p={2}
                borderRadius={2}
                backgroundColor="#FEF3C7"
              >
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Schedule sx={{ color: "#D97706" }} />

                  <Typography
                    color="#D97706"
                    fontWeight={700}
                    fontSize={14}
                  >
                    Result Not Published
                  </Typography>
                </Box>

                <Typography color="#92400E" fontSize={13}>
                  The placement result for this company has not been
                  published yet.
                </Typography>
              </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button
                variant="contained"
                onClick={() => setSelectedCompany(null)}
                sx={{
                  backgroundColor: "#635BEB",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#5142C8",
                  },
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Results;
