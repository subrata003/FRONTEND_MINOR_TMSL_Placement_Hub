import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import {
  Add,
  Delete,
  Search,
} from "@mui/icons-material";

import { students as initialStudents } from "../../../public/data/User.js"

const STORAGE_KEY = "placementHubStudents";

export default function ManageStudent() {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved !== null
        ? JSON.parse(saved)
        : [...initialStudents];
    } catch {
      return [...initialStudents];
    }
  });

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "12345678",
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  // Search students
  const filteredStudents = students.filter((student) =>
    `${student.id} ${student.name} ${student.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Add student
  const handleAddStudent = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name || !email || !form.password) return;

    const alreadyExists = students.some(
      (student) => student.email.toLowerCase() === email
    );

    if (alreadyExists) {
      alert("Student email already exists!");
      return;
    }

    const newStudent = {
      id: Math.max(
        100,
        ...students.map((student) => Number(student.id) || 0)
      ) + 1,
      name,
      email,
      role: "student",
      password: form.password,
    };

    setStudents((previous) => [...previous, newStudent]);

    setForm({
      name: "",
      email: "",
      password: "12345678",
    });

    setPage(0);
    setOpen(false);
  };

  // Delete student
  const handleDeleteStudent = (id) => {
    if (!window.confirm("Do you want to delete this student?")) {
      return;
    }

    setStudents((previous) =>
      previous.filter((student) => student.id !== id)
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Manage Students
          </Typography>

          <Typography color="text.secondary">
            View, add, search and delete student records.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Add Student
        </Button>
      </Stack>

      {/* Student count and search */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Paper
          variant="outlined"
          sx={{ p: 2, flex: 1 }}
        >
          <Typography color="text.secondary">
            Total Students
          </Typography>

          <Typography variant="h4" fontWeight={700}>
            {students.length}
          </Typography>
        </Paper>

        <TextField
          placeholder="Search by ID, name or email..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(0);
          }}
          sx={{ flex: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* Students table */}
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "action.hover" }}>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell align="center">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredStudents
              .slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              .map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>

                  <TableCell>
                    <Chip
                      label={student.role}
                      color="primary"
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDeleteStudent(student.id)
                      }
                      aria-label={`Delete ${student.name}`}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

            {filteredStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredStudents.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50    ]}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(Number(event.target.value));
            setPage(0);
          }}
        />
      </TableContainer>

      {/* Add student dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <Box component="form" onSubmit={handleAddStudent}>
          <DialogTitle>Add New Student</DialogTitle>

          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                label="Student Name"
                value={form.name}
                onChange={(event) =>
                  setForm({
                    ...form,
                    name: event.target.value,
                  })
                }
                required
                fullWidth
              />

              <TextField
                label="Email"
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({
                    ...form,
                    email: event.target.value,
                  })
                }
                required
                fullWidth
              />

              <TextField
                label="Password"
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm({
                    ...form,
                    password: event.target.value,
                  })
                }
                inputProps={{ minLength: 8 }}
                helperText="Minimum 8 characters"
                required
                fullWidth
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button type="submit" variant="contained">
              Add Student
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Container>
  );
}
