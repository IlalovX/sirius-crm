import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getCourses } from "../../services/queries";
import { useState, useEffect } from "react";
import { getCourseDataType } from "../../types/QueriesTypes";
import { NavLink } from "react-router-dom";

function CoursesArchive() {
  const [status, setStatus] = useState("COMPLETED");
  const { data: courses } = getCourses({
    limit: 0,
    offset: 1,
    status: status,
    is_deleted: true,
  });
  const [filteredCourses, setFilteredCourses] = useState(
    courses?.data?.data || []
  );

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  useEffect(() => {
    if (courses) {
      let updatedCourses: getCourseDataType[] = [...courses.data.data];
      switch (status) {
        case "COMPLETED":
          updatedCourses = updatedCourses.filter(
            (course) => course.status === "COMPLETED"
          );
          break;

        case "SUSPENDED":
          updatedCourses = updatedCourses.filter(
            (course) => course.status === "SUSPENDED"
          );
          break;

        default:
          updatedCourses = courses.data.data;
          break;
      }
      setFilteredCourses(updatedCourses);
    }
  }, [courses, status]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <header className="flex justify-between items-center mb-5">
        <h2>Total : {filteredCourses.length} courses</h2>
        <Box sx={{ minWidth: 180 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort by:</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Sort by:"
              onChange={handleChange}
            >
              <MenuItem value="COMPLETED">COMPLETED</MenuItem>
              <MenuItem value="SUSPENDED">SUSPENDED</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </header>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Appointment Date</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses.map((course, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <NavLink
                    to={`/courses/${course.id}`}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    {course.title} {course.group_id}
                  </NavLink>
                </TableCell>
                <TableCell align="right">
                  {new Date(course.created_at).getDate() < 10
                    ? `0${new Date(course.created_at).getDate()}`
                    : new Date(course.created_at).getDate()}
                  .
                  {new Date(course.created_at).getMonth() < 10
                    ? `0${new Date(course.created_at).getMonth()}`
                    : new Date(course.created_at).getMonth()}
                  .{new Date(course.created_at).getFullYear()}
                </TableCell>
                <TableCell align="right">{course.price}</TableCell>
                <TableCell align="right">
                  <p className="py-2 px-5 bg-almost-grey rounded-2xl inline text-blue-500 text-xs">
                    {course.status}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CoursesArchive;
