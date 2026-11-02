// const normalize = (value) => String(value ?? "").trim().toLowerCase();

// const numberOrNull = (value) => {
//   if (value === "" || value === null || value === undefined) return null;
//   const parsed = Number.parseFloat(String(value).replace("%", "").trim());
//   return Number.isFinite(parsed) ? parsed : null;
// };

// const list = (value) => {
//   if (Array.isArray(value)) return value.map(String).map((v) => v.trim()).filter(Boolean);
//   if (typeof value === "string") return value.split(",").map((v) => v.trim()).filter(Boolean);
//   return [];
// };

// const firstDefined = (...values) => values.find((v) => v !== undefined && v !== null && v !== "");

// export const normalizeCompanyForEligibility = (company) => ({
//   ...company,
//   companyName: company.companyName || company.company || "",
//   role: company.role || company.position || "",
//   package: company.package || company.salary || "",
//   departments: firstDefined(company.departments, company.allowedDepartments, company.eligibleDepartments, ""),
//   qualifications: firstDefined(company.qualifications, company.eligibleQualifications, company.eligibility, ""),
//   maxBacklogs: firstDefined(company.maxBacklogs, company.allowedBacklogs, ""),
//   maxTotalBacklogs: firstDefined(company.maxTotalBacklogs, ""),
// });

// export const checkEligibility = (profile, rawCompany) => {
//   const company = normalizeCompanyForEligibility(rawCompany);
//   const reasons = [];
//   const passed = [];

//   const checkMinimum = (label, studentValue, minimum) => {
//     if (minimum === "" || minimum === null || minimum === undefined) return;
//     const actual = numberOrNull(studentValue);
//     const required = numberOrNull(minimum);
//     if (required === null) return;
//     if (actual === null) reasons.push(`${label} information is missing.`);
//     else if (actual < required) reasons.push(`${label} must be at least ${required}.`);
//     else passed.push(`${label} requirement satisfied.`);
//   };

//   const checkMaximum = (label, studentValue, maximum) => {
//     if (maximum === "" || maximum === null || maximum === undefined) return;
//     const actual = numberOrNull(studentValue);
//     const required = numberOrNull(maximum);
//     if (required === null) return;
//     if (actual === null) reasons.push(`${label} information is missing.`);
//     else if (actual > required) reasons.push(`Maximum ${required} ${label.toLowerCase()} allowed.`);
//     else passed.push(`${label} requirement satisfied.`);
//   };

//   checkMinimum("Current CGPA", profile.cgpa, company.minCGPA);
//   checkMinimum("10th percentage", profile.tenth, company.min10th);
//   checkMinimum("12th percentage", profile.twelfth, company.min12th);
//   checkMinimum("Graduation CGPA", profile.graduation?.cgpa, company.minGraduationCGPA);
//   checkMinimum("Post-graduation CGPA", profile.postGraduation?.cgpa, company.minPostGraduationCGPA);

//   const departments = list(company.departments);
//   if (departments.length) {
//     if (!profile.department) reasons.push("Department information is missing.");
//     else if (departments.some((v) => normalize(v) === normalize(profile.department))) passed.push("Department requirement satisfied.");
//     else reasons.push(`Eligible departments: ${departments.join(", ")}.`);
//   }

//   const qualifications = list(company.qualifications);
//   if (qualifications.length) {
//     if (!profile.qualification) reasons.push("Qualification information is missing.");
//     else if (qualifications.some((v) => normalize(v) === normalize(profile.qualification))) passed.push("Qualification requirement satisfied.");
//     else reasons.push(`Required qualification: ${qualifications.join(", ")}.`);
//   }

//   checkMaximum("active backlog(s)", profile.currentBacklogs ?? profile.backlogs, company.maxBacklogs);
//   checkMaximum("total backlog(s)", profile.totalBacklogs, company.maxTotalBacklogs);

//   if (company.requiredRole) {
//     if (!profile.targetRole) reasons.push("Preferred job role is missing.");
//     else if (normalize(profile.targetRole) !== normalize(company.requiredRole)) reasons.push(`This drive requires the preferred role "${company.requiredRole}".`);
//     else passed.push("Preferred role requirement satisfied.");
//   }

//   return {
//     eligible: reasons.length === 0,
//     reasons,
//     passed,
//     companyName: company.companyName,
//     role: company.role,
//   };
// };

// export const getPlacementEligibility = (profile, companies = []) =>
//   companies.map((company) => ({
//     ...company,
//     eligibilityResult: checkEligibility(profile, company),
//   }));

const normalize = (value) =>
  String(value ?? "").trim().toLowerCase();

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const parsed = Number(String(value).replace("%", "").trim());

  return Number.isFinite(parsed) ? parsed : null;
};

const firstDefined = (...values) =>
  values.find(
    (value) => value !== undefined && value !== null && value !== ""
  );

// Normalize company data from ManagePlacement
export const normalizeCompanyForEligibility = (company) => ({
  ...company,

  companyName: company.companyName || company.company || "",
  role: company.role || company.position || "",
  package: company.package || company.salary || "",

  minCGPA: firstDefined(company.minCGPA, ""),
  min10th: firstDefined(company.min10th, ""),
  min12th: firstDefined(company.min12th, ""),

  maxCurrentBacklogs: firstDefined(
    company.maxCurrentBacklogs,
    company.maxBacklogs,
    company.allowedBacklogs,
    ""
  ),

  maxTotalBacklogs: firstDefined(
    company.maxTotalBacklogs,
    ""
  ),
});

// Get criteria for the particular job role
const getRoleCriteria = (company) => {
  const roleCriteria = company.roleCriteria || {};
  const companyRole = normalize(company.role);

  const matchedEntry = Object.entries(roleCriteria).find(
    ([roleName]) => normalize(roleName) === companyRole
  );

  return matchedEntry?.[1] || {};
};

// Check minimum requirement
const checkMinimum = (
  label,
  studentValue,
  minimum,
  reasons,
  passed,
  isPercentage = false
) => {
  const required = toNumber(minimum);

  if (required === null) return;

  const actual = toNumber(studentValue);
  const suffix = isPercentage ? "%" : "";

  if (actual === null) {
    reasons.push(`${label} information is missing.`);
  } else if (actual >= required) {
    passed.push(
      `${label}: ${actual}${suffix} / Required: ${required}${suffix}`
    );
  } else {
    reasons.push(
      `${label} must be at least ${required}${suffix}. Your value: ${actual}${suffix}.`
    );
  }
};

// Check maximum requirement
const checkMaximum = (
  label,
  studentValue,
  maximum,
  reasons,
  passed
) => {
  const required = toNumber(maximum);

  if (required === null) return;

  const actual = toNumber(studentValue);

  if (actual === null) {
    reasons.push(`${label} information is missing.`);
  } else if (actual <= required) {
    passed.push(
      `${label}: ${actual} / Allowed: ${required}`
    );
  } else {
    reasons.push(
      `Maximum ${required} ${label.toLowerCase()} allowed. You have ${actual}.`
    );
  }
};

// Main eligibility checker
export const checkEligibility = (profile, rawCompany) => {
  const company = normalizeCompanyForEligibility(rawCompany);

  const reasons = [];
  const passed = [];

  // General company criteria
  const generalCriteria =
    company.eligibilityCriteria ||
    company.criteria ||
    {};

  // Role-specific criteria
  const roleCriteria = getRoleCriteria(company);

  // Role-specific requirements override general requirements
  const rules = {
    ...generalCriteria,
    ...company,
    ...roleCriteria,
  };

  // 1. Current CGPA
  checkMinimum(
    "Current CGPA",
    profile.cgpa,
    rules.minCGPA,
    reasons,
    passed
  );

  // 2. 10th percentage
  checkMinimum(
    "10th Percentage",
    profile.tenth,
    rules.min10th,
    reasons,
    passed,
    true
  );

  // 3. 12th percentage
  checkMinimum(
    "12th Percentage",
    profile.twelfth,
    rules.min12th,
    reasons,
    passed,
    true
  );

  // 4. Graduation CGPA
  checkMinimum(
    "Graduation CGPA",
    profile.graduation?.cgpa,
    rules.minGraduationCGPA,
    reasons,
    passed
  );

  // 5. Post-graduation CGPA
  checkMinimum(
    "Post-graduation CGPA",
    profile.postGraduation?.cgpa,
    rules.minPostGraduationCGPA,
    reasons,
    passed
  );

  // 6. Current backlogs
  checkMaximum(
    "Current backlogs",
    profile.currentBacklogs ?? profile.backlogs,
    rules.maxCurrentBacklogs ?? rules.maxBacklogs ?? rules.allowedBacklogs,
    reasons,
    passed
  );

  // 7. Total backlogs
  checkMaximum(
    "Total backlogs",
    profile.totalBacklogs,
    rules.maxTotalBacklogs,
    reasons,
    passed
  );

  return {
    eligible: reasons.length === 0,
    reasons,
    passed,

    companyName: company.companyName,
    role: company.role,
  };
};

// Check all placement companies
export const getPlacementEligibility = (profile, companies = []) => {
  if (!profile || !Array.isArray(companies)) {
    return [];
  }

  return companies.map((rawCompany, index) => {
    const company = normalizeCompanyForEligibility(rawCompany);

    const eligibilityResult = checkEligibility(
      profile,
      rawCompany
    );

    return {
      ...company,
      id: company.id ?? index,
      eligibilityResult,
    };
  });
};
