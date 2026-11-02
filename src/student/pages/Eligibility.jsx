// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Box, Card, CardContent, Typography, Chip, Grid, Divider, Stack,
// } from "@mui/material";
// import { CheckCircle, Cancel, BusinessCenter, LocationOn } from "@mui/icons-material";
// import {
//   getProfile,
//   getLoggedUserId
// } from "./ProfileStorage";
// import { getPlacementEligibility } from "../utils/eligibiltyUtils"

// const COMPANY_KEY = "placementHubCompanies";
// const APPLICATION_KEY = "placementHubApplications";

// const readCompanies = () => {
//   try {
//     const saved = localStorage.getItem(COMPANY_KEY);
//     if (saved !== null) return JSON.parse(saved);
//     return [];
//   } catch {
//     return [];
//   }
// };

// export default function Eligibility({ profile: profileProp }) {
//   const [profile, setProfile] = useState(profileProp || null);
//   const [companies, setCompanies] = useState(readCompanies);

//   useEffect(() => {
//     const refreshProfile = () => {
//       if (profileProp) setProfile(profileProp);
//       else {
//         const id = getLoggedUserId();
//         setProfile(id ? getProfile(id) : null);
//       }
//     };
//     const refreshCompanies = () => setCompanies(readCompanies());

//     refreshProfile();
//     refreshCompanies();
//     window.addEventListener("studentProfileUpdated", refreshProfile);
//     window.addEventListener("placementsUpdated", refreshCompanies);
//     window.addEventListener("storage", refreshCompanies);
//     window.addEventListener("focus", refreshCompanies);
//     return () => {
//       window.removeEventListener("studentProfileUpdated", refreshProfile);
//       window.removeEventListener("placementsUpdated", refreshCompanies);
//       window.removeEventListener("storage", refreshCompanies);
//       window.removeEventListener("focus", refreshCompanies);
//     };
//   }, [profileProp]);

//   const results = useMemo(
//     () => profile ? getPlacementEligibility(profile, companies) : [],
//     [profile, companies]
//   );
//   const eligible = results.filter((item) => item.eligibilityResult.eligible);
//   const ineligible = results.filter((item) => !item.eligibilityResult.eligible);

//   const JobCard = ({ job }) => {
//     const result = job.eligibilityResult;
//     return (
//       <Grid item xs={12} md={6} key={job.id}>
//         <Card variant="outlined" sx={{ height: "100%", borderRadius: 3, borderColor: result.eligible ? "success.light" : "error.light" }}>
//           <CardContent>
//             <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1}>
//               <Box>
//                 <Typography variant="h6" fontWeight={700}>{job.companyName || job.company}</Typography>
//                 <Typography color="text.secondary">{job.role}</Typography>
//               </Box>
//               <Chip icon={result.eligible ? <CheckCircle /> : <Cancel />} label={result.eligible ? "Eligible" : "Not Eligible"} color={result.eligible ? "success" : "error"} size="small" />
//             </Box>
//             <Divider sx={{ my: 2 }} />
//             <Stack spacing={1}>
//               <Box display="flex" gap={1} alignItems="center">
//                 <BusinessCenter color="primary" fontSize="small" />
//                 <Typography variant="body2">Package: {job.package || "Not specified"}</Typography>
//               </Box>
//               <Box display="flex" gap={1} alignItems="center">
//                 <LocationOn color="primary" fontSize="small" />
//                 <Typography variant="body2">Location: {job.location || "Not specified"}</Typography>
//               </Box>
//             </Stack>
//             <Divider sx={{ my: 2 }} />
//             <Typography fontWeight={700} mb={1}>Eligibility Details</Typography>
//             {result.eligible ? (
//               <Typography color="success.main" variant="body2">You satisfy all configured requirements.</Typography>
//             ) : (
//               <Stack spacing={0.7}>
//                 {result.reasons.map((reason, index) => (
//                   <Typography key={index} variant="body2" color="error.main">• {reason}</Typography>
//                 ))}
//               </Stack>
//             )}
//             {!!result.passed.length && (
//               <Box mt={2}>
//                 <Typography variant="caption" fontWeight={700} color="success.main">PASSED REQUIREMENTS</Typography>
//                 {result.passed.map((item, index) => <Typography key={index} display="block" variant="caption" color="text.secondary">✓ {item}</Typography>)}
//               </Box>
//             )}
//           </CardContent>
//         </Card>
//       </Grid>
//     );
//   };

//   if (!profile) {
//     return <Card sx={{ p: 3 }}><Typography>Please complete your profile to check placement eligibility.</Typography></Card>;
//   }

//   return (
//     <Box sx={{ mt: 4 }}>
//       <Typography variant="h5" fontWeight={800}>My Placement Eligibility</Typography>
//       <Typography color="text.secondary" sx={{ mb: 3 }}>Your profile is checked against each company's configured requirements.</Typography>
//       <Grid container spacing={2} sx={{ mb: 3 }}>
//         {[
//           ["Total Drives", results.length],
//           ["Eligible", eligible.length],
//           ["Not Eligible", ineligible.length],
//         ].map(([label, value]) => (
//           <Grid item xs={12} sm={4} key={label}>
//             <Card variant="outlined"><CardContent><Typography color="text.secondary">{label}</Typography><Typography variant="h4" fontWeight={800}>{value}</Typography></CardContent></Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Eligible Placements</Typography>
//       <Grid container spacing={2}>
//         {eligible.length ? eligible.map((job) => <JobCard key={job.id} job={job} />) : (
//           <Grid item xs={12}><Typography color="text.secondary">No eligible placements found.</Typography></Grid>
//         )}
//       </Grid>

//       <Typography variant="h6" fontWeight={700} sx={{ mt: 4, mb: 2 }}>Not Eligible Placements</Typography>
//       <Grid container spacing={2}>
//         {ineligible.length ? ineligible.map((job) => <JobCard key={job.id} job={job} />) : (
//           <Grid item xs={12}><Typography color="success.main">You meet all configured placement requirements.</Typography></Grid>
//         )}
//       </Grid>
//     </Box>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Divider,
  Stack,
} from "@mui/material";

import {
  CheckCircle,
  Cancel,
  BusinessCenter,
  LocationOn,
} from "@mui/icons-material";

import {
  getProfile,
  getLoggedUserId,
} from "./ProfileStorage";

import {
  getPlacementEligibility,
} from "../utils/eligibiltyUtils";

const COMPANY_KEY = "placementHubCompanies";

// Read company data from localStorage
const readCompanies = () => {
  try {
    const saved = localStorage.getItem(COMPANY_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error reading placement companies:", error);
    return [];
  }
};

// Individual placement card
const JobCard = ({ job }) => {
  const result = job.eligibilityResult;

  return (
    <Grid item xs={12} md={6}>
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          borderRadius: 3,
          borderColor: result.eligible
            ? "success.light"
            : "error.light",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={1}
          >
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {job.companyName || job.company || "Company"}
              </Typography>

              <Typography color="text.secondary">
                {job.role || "Role not specified"}
              </Typography>
            </Box>

            <Chip
              icon={
                result.eligible ? (
                  <CheckCircle />
                ) : (
                  <Cancel />
                )
              }
              label={
                result.eligible
                  ? "Eligible"
                  : "Not Eligible"
              }
              color={result.eligible ? "success" : "error"}
              size="small"
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1}>
            <Box display="flex" gap={1} alignItems="center">
              <BusinessCenter color="primary" fontSize="small" />

              <Typography variant="body2">
                Package: {job.package || job.salary || "Not specified"}
              </Typography>
            </Box>

            <Box display="flex" gap={1} alignItems="center">
              <LocationOn color="primary" fontSize="small" />

              <Typography variant="body2">
                Location: {job.location || "Not specified"}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography fontWeight={700} mb={1}>
            Eligibility Details
          </Typography>

          {result.eligible ? (
            <Typography
              color="success.main"
              variant="body2"
            >
              You satisfy all configured eligibility requirements.
            </Typography>
          ) : (
            <Stack spacing={0.7}>
              {result.reasons.map((reason, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  color="error.main"
                >
                  • {reason}
                </Typography>
              ))}
            </Stack>
          )}

          {result.passed.length > 0 && (
            <Box mt={2}>
              <Typography
                variant="caption"
                fontWeight={700}
                color="success.main"
              >
                PASSED REQUIREMENTS
              </Typography>

              {result.passed.map((item, index) => (
                <Typography
                  key={index}
                  display="block"
                  variant="caption"
                  color="text.secondary"
                >
                  ✓ {item}
                </Typography>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default function Eligibility({ profile: profileProp }) {
  const [profile, setProfile] = useState(
    profileProp || null
  );

  const [companies, setCompanies] = useState(readCompanies);

  // Refresh profile and company data
  useEffect(() => {
    const refreshProfile = () => {
      if (profileProp) {
        setProfile(profileProp);
        return;
      }

      const userId = getLoggedUserId();

      const savedProfile = userId
        ? getProfile(userId)
        : null;

      setProfile(savedProfile);
    };

    const refreshCompanies = () => {
      setCompanies(readCompanies());
    };

    refreshProfile();
    refreshCompanies();

    window.addEventListener(
      "studentProfileUpdated",
      refreshProfile
    );

    window.addEventListener(
      "placementsUpdated",
      refreshCompanies
    );

    window.addEventListener(
      "storage",
      refreshCompanies
    );

    window.addEventListener(
      "focus",
      refreshCompanies
    );

    return () => {
      window.removeEventListener(
        "studentProfileUpdated",
        refreshProfile
      );

      window.removeEventListener(
        "placementsUpdated",
        refreshCompanies
      );

      window.removeEventListener(
        "storage",
        refreshCompanies
      );

      window.removeEventListener(
        "focus",
        refreshCompanies
      );
    };
  }, [profileProp]);

  // Check eligibility
  const results = useMemo(() => {
    if (!profile) return [];

    return getPlacementEligibility(profile, companies);
  }, [profile, companies]);

  const eligible = results.filter(
    (job) => job.eligibilityResult.eligible
  );

  const ineligible = results.filter(
    (job) => !job.eligibilityResult.eligible
  );

  // Profile missing
  if (!profile) {
    return (
      <Card sx={{ p: 3, borderRadius: 3 }}>
        <Typography>
          Please complete your profile to check placement eligibility.
        </Typography>
      </Card>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight={800}>
        My Placement Eligibility
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Your CGPA, academic percentages and backlogs are
        checked against each company's role-wise requirements.
      </Typography>

      {/* Summary cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          ["Total Drives", results.length],
          ["Eligible", eligible.length],
          ["Not Eligible", ineligible.length],
        ].map(([label, value]) => (
          <Grid item xs={12} sm={4} key={label}>
            <Card variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography color="text.secondary">
                  {label}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={800}
                >
                  {value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No company data */}
      {companies.length === 0 && (
        <Card
          variant="outlined"
          sx={{ p: 3, borderRadius: 3, mb: 3 }}
        >
          <Typography fontWeight={700}>
            No placement drives found.
          </Typography>

          <Typography
            color="text.secondary"
            variant="body2"
          >
            Please add placement drives from the Admin
            Manage Placement section.
          </Typography>
        </Card>
      )}

      {/* Eligible placements */}
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        Eligible Placements ({eligible.length})
      </Typography>

      <Grid container spacing={2}>
        {eligible.length > 0 ? (
          eligible.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))
        ) : (
          <Grid item xs={12}>
            <Typography color="text.secondary">
              No eligible placements found.
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Not eligible placements */}
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{ mt: 4, mb: 2 }}
      >
        Not Eligible Placements ({ineligible.length})
      </Typography>

      <Grid container spacing={2}>
        {ineligible.length > 0 ? (
          ineligible.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))
        ) : (
          <Grid item xs={12}>
            <Typography color="success.main">
              You meet all configured placement requirements.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
