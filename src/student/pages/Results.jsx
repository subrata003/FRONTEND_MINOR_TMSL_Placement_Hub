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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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

      
{/* PLACEMENT PROGRESS SECTION */}
<Card
  elevation={0}
  sx={{
    width: "100%",
    borderRadius: "22px",
    border: "1px solid #E5E7F5",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 8px 25px rgba(99, 91, 235, 0.06)",
    overflow: "hidden",
  }}
>
  <CardContent
    sx={{
      p: { xs: 2.5, md: 4 },
      "&:last-child": { pb: 4 },
    }}
  >

    {/* HEADER */}
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      mb={4}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "17px",
          background: "linear-gradient(135deg, #EFEDFF, #E5E2FF)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#635BEB",
        }}
      >
        <TrendingUp sx={{ fontSize: 36 }} />
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: { xs: 18, md: 24 },
            fontWeight: 750,
            color: "#172554",
          }}
        >
          Placement Progress
        </Typography>

        <Typography
          sx={{
            fontSize: 15,
            color: "#64748B",
            mt: 0.5,
          }}
        >
          Your overall placement performance
        </Typography>
      </Box>
    </Box>

    {/* PROGRESS INFORMATION */}
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Box>
        <Typography
          fontSize={19}
          fontWeight={700}
          color="#172554"
        >
          Results Published
        </Typography>

        <Typography
          fontSize={14}
          color="#64748B"
          mt={0.5}
        >
          Track your completed placement results
        </Typography>
      </Box>

      <Box display="flex" alignItems="baseline" gap={0.8}>
        <Typography
          sx={{
            fontSize: { xs: 32, md: 48 },
            fontWeight: 800,
            color: "#4F46E5",
          }}
        >
          {published}
        </Typography>

        <Typography
          fontSize={28}
          fontWeight={600}
          color="#94A3B8"
        >
          / {total}
        </Typography>
      </Box>
    </Box>

    {/* PROGRESS BAR */}
    <LinearProgress
      variant="determinate"
      value={total > 0 ? (published / total) * 100 : 0}
      sx={{
        height: 14,
        borderRadius: 10,
        backgroundColor: "#E9EAF7",
        mb: 3.5,
        "& .MuiLinearProgress-bar": {
          borderRadius: 10,
          background: "linear-gradient(90deg, #635BEB, #8B80FF)",
        },
      }}
    />

    {/* STATUS CARDS */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(3, 1fr)",
        },
        gap: 2.5,
      }}
    >
      {[
        {
          title: "Published",
          count: published,
          icon: <CheckCircle sx={{ fontSize: 34 }} />,
          color: "#16A34A",
          background: "#F0FDF4",
          border: "#BBF7D0",
        },
        {
          title: "Pending",
          count: pending,
          icon: <Schedule sx={{ fontSize: 34 }} />,
          color: "#F59E0B",
          background: "#FFFBEB",
          border: "#FDE68A",
        },
        {
          title: "Rejected",
          count: rejected,
          icon: <Cancel sx={{ fontSize: 34 }} />,
          color: "#DC2626",
          background: "#FEF2F2",
          border: "#FECACA",
        },
      ].map((item) => (
        <Box
          key={item.title}
          sx={{
            p: 3,
            minHeight: 115,
            borderRadius: "17px",
            backgroundColor: item.background,
            border: `1px solid ${item.border}`,
            display: "flex",
            alignItems: "center",
            gap: 2,
            transition: "all 0.25s ease",

            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            },
          }}
        >
          <Box
            sx={{
              width: 58,
              height: 58,
              minWidth: 58,
              borderRadius: "50%",
              backgroundColor: item.color,
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.icon}
          </Box>

          <Box>
            <Typography
              fontSize={17}
              fontWeight={700}
              color={item.color}
              mb={0.5}
            >
              {item.title}
            </Typography>

            <Typography
              fontSize={28}
              fontWeight={800}
              color="#172554"
            >
              {String(item.count).padStart(2, "0")}
            </Typography>
          </Box>
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
    borderRadius: "18px",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  }}
>
  <CardContent sx={{ p: { xs: 2, md: 3 } }}>

    {/* SECTION HEADER */}
    <Box
      display="flex"
      alignItems="center"
      gap={1.5}
      mb={0.7}
    >
      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: "12px",
          backgroundColor: "#EEF0FF",
          color: "#635BEB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Business fontSize="medium" />
      </Box>

      <Box>
        <Typography
          fontSize={19}
          fontWeight={700}
          color="#172554"
        >
          Company-wise Results
        </Typography>

        <Typography fontSize={13} color="#64748B">
          Check company details and placement updates.
        </Typography>
      </Box>
    </Box>

    {/* SEARCH AND FILTER */}
    <Box
      display="flex"
      gap={2}
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
      my={3}
    >
      <TextField
        size="small"
        placeholder="Search company, role or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          width: { xs: "100%", sm: 350 },
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "#FAFBFF",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: "#94A3B8" }} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        select
        size="small"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{
          width: { xs: "100%", sm: 160 },
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "#FAFBFF",
          },
        }}
      >
        <MenuItem value="All">All Companies</MenuItem>
        <MenuItem value="Open">Open</MenuItem>
        <MenuItem value="Closed">Closed</MenuItem>
      </TextField>
    </Box>

    {/* COMPANY TABLE */}
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: "12px",
        border: "1px solid #EDF0F7",
        overflowX: "auto",
      }}
    >
      <Table sx={{ minWidth: 750 }}>

        {/* TABLE HEADER */}
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#F5F6FC",
              "& th": {
                fontWeight: 700,
                color: "#475569",
                fontSize: 13,
                py: 2,
                whiteSpace: "nowrap",
                borderBottom: "1px solid #E5E7F0",
              },
            }}
          >
            <TableCell>Company</TableCell>
            <TableCell>Job Role</TableCell>
            <TableCell>Package</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Drive Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>

        {/* TABLE BODY */}
        <TableBody>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <TableRow
                key={company.id}
                hover
                sx={{
                  transition: "0.2s",
                  "&:hover": {
                    backgroundColor: "#F8F9FF",
                  },
                  "& td": {
                    py: 2,
                    borderBottom: "1px solid #EDF0F7",
                  },
                }}
              >

                {/* COMPANY */}
                <TableCell>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "11px",
                        backgroundColor: "#EEF0FF",
                        color: "#635BEB",
                        fontSize: 17,
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {company.logo}
                    </Box>

                    <Typography
                      fontSize={14}
                      fontWeight={700}
                      color="#172554"
                    >
                      {company.company}
                    </Typography>
                  </Box>
                </TableCell>

                {/* ROLE */}
                <TableCell>
                  <Typography
                    fontSize={13}
                    fontWeight={500}
                    color="#475569"
                  >
                    {company.role}
                  </Typography>
                </TableCell>

                {/* PACKAGE */}
                <TableCell>
                  <Chip
                    label={company.package}
                    size="small"
                    sx={{
                      backgroundColor: "#F0FDF4",
                      color: "#15803D",
                      fontWeight: 700,
                      borderRadius: "7px",
                    }}
                  />
                </TableCell>

                {/* LOCATION */}
                <TableCell>
                  <Typography fontSize={13} color="#475569">
                    {company.location}
                  </Typography>
                </TableCell>

                {/* DRIVE DATE */}
                <TableCell>
                  <Typography
                    fontSize={13}
                    color="#475569"
                    whiteSpace="nowrap"
                  >
                    {company.driveDate}
                  </Typography>
                </TableCell>

                {/* STATUS */}
                <TableCell>
                  <Chip
                    label={company.status}
                    size="small"
                    color={company.status === "Open" ? "success" : "default"}
                    sx={{
                      fontWeight: 600,
                      borderRadius: "7px",
                    }}
                  />
                </TableCell>

                {/* ACTION */}
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="text"
                    startIcon={<Visibility />}
                    onClick={() => handleViewCompany(company)}
                    sx={{
                      color: "#635BEB",
                      fontWeight: 700,
                      textTransform: "none",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "#EEF0FF",
                      },
                    }}
                  >
                    View
                  </Button>
                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>
                <Box
                  py={6}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={1}
                >
                  <Search sx={{ fontSize: 40, color: "#CBD5E1" }} />

                  <Typography
                    fontWeight={600}
                    color="#475569"
                  >
                    No companies found
                  </Typography>

                  <Typography fontSize={13} color="#94A3B8">
                    Try changing your search or filter.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>
    </TableContainer>

    {/* FOOTER */}
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={2}
      flexWrap="wrap"
      gap={1}
    >
      <Typography fontSize={12} color="#94A3B8">
        Showing {filteredCompanies.length} of {upcomingCompanies.length} companies
      </Typography>
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
