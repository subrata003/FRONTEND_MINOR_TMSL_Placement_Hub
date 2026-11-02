// Admin account
export const admin = {
  id: 1,
  name: "Placement Admin",
  email: "admin@placementhub.com",
  role: "admin",
  password: "Admin@123",
};


export let students = [
  {
    id: 101,
    name: "Sourav Ghosh",
    email: "sourav@gmail.com",
    rollNumber:12345678,
    role: "student",
    password: "12345678",
  },
  {
    id: 102,
    name: "Riya Paul",
    email: "riya.paul@gmail.com",
    rollNumber:12345679,
    role: "student",
    password: "12345678",
  },
  {
    id: 103,
    name: "Subrata Roy",
    email: "subrata.roy@gmail.com",
    rollNumber:12345677,
    role: "student",
    password: "12345678",
  },
  {
    id: 104,
    name: "Tamal Sarkar",
    email: "tamal.sarkar@gmail.com",
    rollNumber:12345675,
    role: "student",
    password: "12345678",
  },
  
  
];

// // Add new student
// export const addStudent = (student) => {
//   students.push({
//     ...student,
//     id: Date.now(),
//     role: "student",
//   });
// };

// Add numeric roll numbers to all existing students
students = students.map((student) => ({
  ...student,
  rollNumber: student.id,
}));

// Add new student
export const addStudent = (student) => {
  const email = student.email.trim().toLowerCase();
  const rollNumber = String(student.rollNumber).trim();

  // Validate roll number
  if (!/^\d+$/.test(rollNumber)) {
    return false;
  }

  // Check duplicate email or roll number
  const duplicate = students.some(
    (s) =>
      s.email.toLowerCase() === email ||
      String(s.rollNumber) === rollNumber
  );

  if (duplicate) {
    return false;
  }

  const newStudent = {
    ...student,
    id: Date.now(),
    rollNumber: Number(rollNumber),
    email,
    role: "student",
  };

  students.push(newStudent);

  return newStudent;
};
