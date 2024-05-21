import * as React from "react";
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
import { NavLink } from "react-router-dom";
import EditTeacher from "../../components/edit-teacher/EditTeacher";
import { getStaff } from "../../services/queries";
import { getStaffDataType } from "../../types/QueriesTypes";
import { deleteStaff } from "../../services/mutations";

function Teachers() {
  const { data: staffs } = getStaff({ limit: 0, offset: 1 });
  const delStaff = deleteStaff();

  const [selectedTeacher, setSelectedTeacher] =
    React.useState<getStaffDataType | null>(null);
  const [showAllTeachers, setShowAllTeachers] = React.useState<boolean>(true);

  const handleAutocompleteChange = (
    e: React.ChangeEvent<{}>,
    value: getStaffDataType | string | null
  ) => {
    console.log(e);

    if (typeof value === "string") {
      const teacher = staffs?.data?.data?.find(
        (row) => row.first_name === value
      );
      setSelectedTeacher(teacher || null);
      setShowAllTeachers(!teacher);
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

  const handleDeleteStaff = (id: string) => {
    delStaff.mutateAsync({ id: id as string });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <header className="flex justify-between items-center mb-5">
        <h2>Total : {staffs?.data?.data?.length} teachers</h2>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={
            staffs?.data?.data
              ? staffs?.data?.data?.map((option) => option?.first_name)
              : []
          }
          sx={{ width: 300 }}
          value={selectedTeacher ? selectedTeacher?.first_name : ""}
          onChange={handleAutocompleteChange}
          onInputChange={handleInputChange}
          renderInput={(params) => <TextField {...params} label="Name" />}
        />
      </header>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          padding="normal"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <CircleIcon sx={{ height: 40, width: 40, color: "grey" }} />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Telegram User</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Course</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showAllTeachers ? (
              staffs?.data.data.map((item) => (
                <TableRow key={item.first_name}>
                  <TableCell component="th" scope="row">
                    <Avatar
                      sx={{ height: 40, width: 40 }}
                      alt={item.first_name}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <NavLink
                      to={`/teachers/${item.id}`}
                      className="text-blue-500 underline"
                    >
                      {item.first_name}
                    </NavLink>
                  </TableCell>
                  <TableCell align="right">{item.tg_username}</TableCell>
                  <TableCell align="right">{item.phone_number}</TableCell>
                  <TableCell align="right">{item.direction}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteStaff(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <EditTeacher id={item.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : selectedTeacher ? (
              <TableRow key={selectedTeacher.first_name}>
                <TableCell component="th" scope="row">
                  <Avatar
                    sx={{ height: 40, width: 40 }}
                    alt={selectedTeacher.first_name}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <NavLink to={`/teachers/${selectedTeacher.id}`}>
                    {selectedTeacher.first_name}
                  </NavLink>
                </TableCell>
                <TableCell align="right">
                  {selectedTeacher.tg_username}
                </TableCell>
                <TableCell align="right">
                  {selectedTeacher.phone_number}
                </TableCell>
                <TableCell align="right">{selectedTeacher.direction}</TableCell>
                <TableCell align="right">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteStaff(selectedTeacher.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <EditTeacher id={selectedTeacher.id} />
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Teachers;
