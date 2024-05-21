import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  TextField,
  Autocomplete,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CircleIcon from "@mui/icons-material/Circle";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import EditStudent from "../../components/edit-student/EditStudent";
import { getStudentsDataType } from "../../types/QueriesTypes";
import { getStudents } from "../../services/queries";
import { deleteStudent } from "../../services/mutations";

function Students() {
  const { data: rows } = getStudents({ limit: 10, offset: 1 });
  const delStudent = deleteStudent();

  const [selectedStudent, setSelectedTeacher] =
    useState<getStudentsDataType | null>(null);
  const [showAllTeachers, setShowAllTeachers] = useState<boolean>(true);

  const handleAutocompleteChange = (
    e: React.ChangeEvent<{}>,
    value: getStudentsDataType | string | null
  ) => {
    e;
    if (typeof value === "string") {
      const student = rows?.data.data.find((row) => row.first_name === value);
      setSelectedTeacher(student || null);
      setShowAllTeachers(!student);
    } else {
      setSelectedTeacher(value);
      setShowAllTeachers(!value);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<{}>,
    value: string,
    reason: string
  ) => {
    console.log(e, value);

    if (reason === "clear") {
      setShowAllTeachers(true);
    }
  };

  const handleDeleteStudent = (id: string) => {
    delStudent.mutateAsync({ id: id });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <header className="flex justify-between items-center mb-5">
        <h2>Total : {rows?.data.data.length} students</h2>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={
            rows?.data.data
              ? rows?.data.data.map((option) => option.first_name)
              : []
          }
          sx={{ width: 300 }}
          value={selectedStudent ? selectedStudent.first_name : ""}
          onChange={handleAutocompleteChange}
          onInputChange={handleInputChange}
          renderInput={(params) => <TextField {...params} label="Name" />}
        />
      </header>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <CircleIcon sx={{ height: 40, width: 40, color: "grey" }} />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Telegram User</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Course</TableCell>
              <TableCell align="right">Comment</TableCell>
              <TableCell align="right">Record</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showAllTeachers ? (
              rows?.data.data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Avatar
                      sx={{ height: 40, width: 40 }}
                      alt={row.first_name}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <NavLink to={`/students/${row.id}`}>
                      {row.first_name}
                    </NavLink>
                  </TableCell>
                  <TableCell align="right">{row.tg_username}</TableCell>
                  <TableCell align="right">{row.phone_number}</TableCell>
                  <TableCell align="right">{row.group.title}</TableCell>
                  <TableCell align="right">{row.comment}</TableCell>
                  <TableCell align="right">
                    {new Date(row.created_at).getDay() < 10
                      ? `0${new Date(row.created_at).getDay()}`
                      : new Date(row.created_at).getDay()}
                    .
                    {new Date(row.created_at).getMonth() < 10
                      ? `0${new Date(row.created_at).getDay()}`
                      : new Date(row.created_at).getDay()}
                    .{new Date(row.created_at).getFullYear()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteStudent(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <EditStudent id={row.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : selectedStudent ? (
              <TableRow key={selectedStudent.id}>
                <TableCell component="th" scope="row">
                  <Avatar
                    sx={{ height: 40, width: 40 }}
                    alt={selectedStudent.first_name}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <NavLink to={`/students/1`}>
                    {selectedStudent.first_name}
                  </NavLink>
                </TableCell>
                <TableCell align="right">
                  {selectedStudent.tg_username}
                </TableCell>
                <TableCell align="right">
                  {selectedStudent.phone_number}
                </TableCell>
                <TableCell align="right">
                  {selectedStudent.group.title}
                </TableCell>
                <TableCell align="right">{selectedStudent.comment}</TableCell>
                <TableCell align="right">
                  {new Date(selectedStudent.created_at).getDay() < 10
                    ? `0${new Date(selectedStudent.created_at).getDay()}`
                    : new Date(selectedStudent.created_at).getDay()}
                  .
                  {new Date(selectedStudent.created_at).getMonth() < 10
                    ? `0${new Date(selectedStudent.created_at).getDay()}`
                    : new Date(selectedStudent.created_at).getDay()}
                  .{new Date(selectedStudent.created_at).getFullYear()}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteStudent(selectedStudent.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <EditStudent id={selectedStudent.id} />
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Students;
