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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CircleIcon from "@mui/icons-material/Circle";
import { useState } from "react";
import EditStudent from "../../components/edit-student/EditStudent";
import { NavLink } from "react-router-dom";

interface Student {
  status: boolean;
  photo: string;
  label: string;
  telegram: string;
  phone: string;
  course: string;
  completed: string;
}

function createData(
  status: boolean,
  photo: string,
  label: string,
  telegram: string,
  phone: string,
  course: string,
  completed: string
) {
  return { status, photo, label, telegram, phone, course, completed };
}

const rows = [
  createData(
    false,
    "https://mui.com/static/images/avatar/3.jpg",
    "Anna",
    "@anna",
    "+998919999999",
    "Frontend",
    "15.04.2024"
  ),
  createData(
    true,
    "https://mui.com/static/images/avatar/3.jpg",
    "Janna",
    "@janna",
    "+998919999999",
    "Backend",
    "07.04.2023"
  ),
];
function Archive() {
  const [selectedTeacher, setSelectedTeacher] = useState<Student | null>(null);
  const [showAllTeachers, setShowAllTeachers] = useState<boolean>(true);

  const handleAutocompleteChange = (
    e: React.ChangeEvent<{}>,
    value: Student | string | null
  ) => {
    console.log(e);

    if (typeof value === "string") {
      const student = rows.find((row) => row.label === value);
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
      setShowAllTeachers(true); // Показывать весь список при очистке текстового поля
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <header className="flex justify-between items-center mb-5">
        <h2>Total : {rows.length} students</h2>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={rows.map((option) => option.label)}
          sx={{ width: 300 }}
          value={selectedTeacher ? selectedTeacher.label : ""}
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
                <CircleIcon
                  sx={{
                    height: 40,
                    width: 40,
                    color: "grey",
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Telegram User</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Course</TableCell>
              <TableCell align="right">Completed</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showAllTeachers ? (
              rows.map((row) => (
                <TableRow key={row.label}>
                  <TableCell component="th" scope="row">
                    <CircleIcon
                      sx={{
                        height: 40,
                        width: 40,
                        color: row.status ? "green" : "red",
                      }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <NavLink to={"/students/1"}>{row.label}</NavLink>
                  </TableCell>
                  <TableCell align="right">{row.telegram}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">{row.course}</TableCell>
                  <TableCell align="right">{row.completed}</TableCell>
                  <TableCell align="right">
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <EditStudent id={"1"} />
                  </TableCell>
                </TableRow>
              ))
            ) : selectedTeacher ? (
              <TableRow key={selectedTeacher.label}>
                <TableCell component="th" scope="row">
                  <CircleIcon
                    sx={{
                      height: 40,
                      width: 40,
                      color: selectedTeacher?.status ? "green" : "red",
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <NavLink to={"/students/1"}>{selectedTeacher.label}</NavLink>
                </TableCell>
                <TableCell align="right">{selectedTeacher.telegram}</TableCell>
                <TableCell align="right">{selectedTeacher.course}</TableCell>
                <TableCell align="right">{selectedTeacher.completed}</TableCell>
                <TableCell align="right">
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <EditStudent id={"1"} />
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Archive;
