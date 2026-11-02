// profileStorage.js

const STORAGE_KEY = "placementHubProfiles";

// Default profile data
export const defaultProfile = {
  profileImage: "",
  name: "",
  email: "",
  number: "",
  qualification: "MCA",

  cgpa: "",
  tenth: "",
  twelfth: "",

  graduation: {
    college: "",
    university: "",
    cgpa: "",
  },

  postGraduation: {
    college: "",
    university: "",
    cgpa: "",
  },

  resume: null,
};

// Get all student profiles
export const getAllProfiles = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (error) {
    console.error("Error reading profiles:", error);
    return {};
  }
};
export const getLoggedUserId = () => {
  try {
    const loggedUser = JSON.parse(
      localStorage.getItem("loggedUser") || "null"
    );

    return loggedUser?.id || loggedUser?.email || null;
  } catch (error) {
    console.error("Error getting logged user:", error);
    return null;
  }
};

// Get profile of a particular student
export const getProfile = (userId) => {
  if (!userId) return null;

  const profiles = getAllProfiles();
  return profiles[userId] || null;
};

// Save profile
export const saveProfile = (userId, profile) => {
  if (!userId) {
    throw new Error("Student ID or email not found.");
  }

  const profiles = getAllProfiles();

  profiles[userId] = {
    ...profile,
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    return profiles[userId];
  } catch (error) {
    console.error("Error saving profile:", error);
    throw new Error(
      "Could not save profile. The uploaded files may be too large."
    );
  }
};


// Convert uploaded image or resume into Base64
export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve({
        name: file.name,
        type: file.type,
        data: reader.result,
      });
    };

    reader.onerror = () => {
      reject(new Error("File could not be read."));
    };

    reader.readAsDataURL(file);
  });
};