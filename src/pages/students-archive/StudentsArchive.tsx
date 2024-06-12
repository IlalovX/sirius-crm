import { getStudents } from "../../services/queries";
import { useState } from "react";
import { getStudentsDataType } from "../../types/QueriesTypes";
import {
  Autocomplete,
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { NavLink } from "react-router-dom";

function StudentsArchive() {
  const { data: students } = getStudents({
    limit: 10,
    offset: 1,
    status: "",
    is_deleted: true,
  });

  const [selectedStudent, setSelectedTeacher] =
    useState<getStudentsDataType | null>(null);
  const [showAllTeachers, setShowAllTeachers] = useState<boolean>(true);

  const handleAutocompleteChange = (
    e: React.ChangeEvent<{}>,
    value: getStudentsDataType | string | null
  ) => {
    e;
    if (typeof value === "string") {
      const student = students?.data.data.find(
        (item) => item.first_name === value
      );
      setSelectedTeacher(student || null);
      setShowAllTeachers(!student);
    } else {
      setSelectedTeacher(value);
      setShowAllTeachers(!value);
    }
  };

  const handleInputChange = (
    _: React.ChangeEvent<{}>,
    __: string,
    reason: string
  ) => {
    if (reason === "clear") {
      setShowAllTeachers(true);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <header className="flex justify-between items-center mb-5">
        <h2>
          Total : {!!students?.data.data ? `${students?.data.data.length} ` : 0}
          students
        </h2>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={
            students?.data.data
              ? students?.data.data.map((option) => option.first_name)
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
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Comment</TableCell>
              <TableCell align="right">Record</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showAllTeachers ? (
              students?.data.data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    <Avatar
                      sx={{ height: 40, width: 40 }}
                      alt={item.first_name}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <NavLink to={`/students/${item.id}`}>
                      {item.first_name}
                    </NavLink>
                  </TableCell>
                  <TableCell align="right">{item.tg_username}</TableCell>
                  <TableCell align="right">{item.phone_number}</TableCell>
                  <TableCell align="right">{item.group.title}</TableCell>
                  <TableCell align="right">
                    <p className="py-2 px-5 bg-almost-grey rounded-2xl inline text-blue-500 text-xs">
                      {item.status}
                    </p>
                  </TableCell>

                  <TableCell align="right">{item.comment}</TableCell>
                  <TableCell align="right">
                    {new Date(item.created_at).getDay() < 10
                      ? `0${new Date(item.created_at).getDay()}`
                      : new Date(item.created_at).getDay()}
                    .
                    {new Date(item.created_at).getMonth() < 10
                      ? `0${new Date(item.created_at).getDay()}`
                      : new Date(item.created_at).getDay()}
                    .{new Date(item.created_at).getFullYear()}
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
                <TableCell align="right">
                  <p className="py-2 px-5 bg-almost-grey rounded-2xl inline text-blue-500 text-xs">
                    {selectedStudent.status}
                  </p>
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
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default StudentsArchive;
