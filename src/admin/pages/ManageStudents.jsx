
import { useEffect, useState } from "react";

import {
  Alert,
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

      if (saved !== null) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Failed to load saved students:", error);
    }

    return initialStudents;
  });

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "12345678",
  });

  // Save student data whenever it changes.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(students)
      );
    } catch (error) {
      console.error("Failed to save students:", error);
    }
  }, [students]);

  // Search by ID, name, or email.
  const filteredStudents = students.filter((student) =>
    `${student.id} ${student.name} ${student.email}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  // Keep the current page valid after deleting or searching.
  const pageCount = Math.ceil(
    filteredStudents.length / rowsPerPage
  );

  const safePage = Math.min(
    page,
    Math.max(0, pageCount - 1)
  );

  const visibleStudents = filteredStudents.slice(
    safePage * rowsPerPage,
    safePage * rowsPerPage + rowsPerPage
  );

  // Open the add student dialog.
  const handleOpen = () => {
    setError("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  // Add a student.
  const handleAddStudent = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!name || !email || password.length < 8) {
      setError(
        "Enter a name, a valid email, and a password of at least 8 characters."
      );
      return;
    }

    const emailExists = students.some(
      (student) =>
        student.email?.toLowerCase() === email
    );

    if (emailExists) {
      setError("This email address already exists.");
      return;
    }

    const highestId = students.reduce(
      (max, student) =>
        Math.max(max, Number(student.id) || 100),
      100
    );

    const newStudent = {
      id: highestId + 1,
      name,
      email,
      role: "student",
      password,
    };

    setStudents((previous) => [
      ...previous,
      newStudent,
    ]);

    setSearch("");
    setPage(0);

    setForm({
      name: "",
      email: "",
      password: "12345678",
    });

    handleClose();
  };

  // Delete a student.
  const handleDeleteStudent = (id) => {
    const confirmed = window.confirm(
      "Do you want to delete this student?"
    );

    if (!confirmed) return;

    setStudents((previous) =>
      previous.filter((student) => student.id !== id)
    );
  };

  // Reset local data to the imported student list.
  const handleResetData = () => {
    const confirmed = window.confirm(
      "Restore the original student records? This will remove locally added records and restore deleted ones."
    );

    if (!confirmed) return;

    setStudents([...initialStudents]);
    setSearch("");
    setPage(0);
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

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
        >
          <Button
            variant="outlined"
            onClick={handleResetData}
          >
            Restore Original Data
          </Button>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpen}
          >
            Add Student
          </Button>
        </Stack>
      </Stack>

      {/* Student statistics and search */}
      <Stack
        direction={{ xs: "column", md: "row" }}
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

        <Paper
          variant="outlined"
          sx={{ p: 2, flex: 1 }}
        >
          <Typography color="text.secondary">
            Search Results
          </Typography>

          <Typography variant="h4" fontWeight={700}>
            {filteredStudents.length}
          </Typography>
        </Paper>

        <TextField
          fullWidth
          placeholder="Search by ID, name or email..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(0);
          }}
          sx={{ flex: 2 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      {/* Students table */}
      <TableContainer
        component={Paper}
        variant="outlined"
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "action.hover" }}>
              <TableCell>
                <strong>ID</strong>
              </TableCell>

              <TableCell>
                <strong>Name</strong>
              </TableCell>

              <TableCell>
                <strong>Email</strong>
              </TableCell>

              <TableCell>
                <strong>Role</strong>
              </TableCell>

              <TableCell align="center">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleStudents.map((student) => (
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
                    aria-label={`Delete ${student.name}`}
                    onClick={() =>
                      handleDeleteStudent(student.id)
                    }
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {visibleStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography
                    color="text.secondary"
                    sx={{ py: 3 }}
                  >
                    No students found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredStudents.length}
          page={safePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          onPageChange={(_, newPage) => {
            setPage(newPage);
          }}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(Number(event.target.value));
            setPage(0);
          }}
        />
      </TableContainer>

      {/* Add student dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <Box component="form" onSubmit={handleAddStudent}>
          <DialogTitle>Add New Student</DialogTitle>

          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              {error && (
                <Alert severity="error">
                  {error}
                </Alert>
              )}

              <TextField
                label="Student Name"
                value={form.name}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    name: event.target.value,
                  }))
                }
                required
                fullWidth
              />

              <TextField
                label="Email"
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    email: event.target.value,
                  }))
                }
                required
                fullWidth
              />

              <TextField
                label="Password"
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    password: event.target.value,
                  }))
                }
                slotProps={{
                  htmlInput: { minLength: 8 },
                }}
                helperText="Minimum 8 characters"
                required
                fullWidth
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleClose}>
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
