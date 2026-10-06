// Admin account
export const admin = {
  id: 1,
  name: "Placement Admin",
  email: "admin@placementhub.com",
  role: "admin",
  password: "Admin@123",
};

// Multiple student accounts
export let students = [
  {
    id: 101,
    name: "Sourav Ghosh",
    email: "sourav@gmail.com",
    role: "student",
    password: "12345678",
  },
  {
    id: 102,
    name: "Riya Paul",
    email: "riya@gmail.com",
    role: "student",
    password: "12345678",
  },
  {
    id: 103,
    name: "Subrata Roy",
    email: "subrata@gmail.com",
    role: "student",
    password: "12345678",
  },
];

// Add new student
export const addStudent = (student) => {
  students.push({
    ...student,
    id: Date.now(),
    role: "student",
  });
};