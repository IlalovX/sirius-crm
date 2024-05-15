import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import EditCourse from "../../components/edit-course/EditCourse";
import { getCourses } from "../../services/queries";

function Courses() {
  const { data: courses } = getCourses();
  const [filter, setFilter] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <header className="flex justify-between items-center mb-5">
        <h2>Total : {courses?.data.data.length} courses</h2>
        <Box sx={{ minWidth: 180 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort by:</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Sort by:"
              onChange={handleChange}
            >
              <MenuItem value="Убывание">Убывание</MenuItem>
              <MenuItem value="Возрастание">Возрастание</MenuItem>
              <MenuItem value="Закрытый">Закрытый</MenuItem>
              <MenuItem value="В процессе">В процессе</MenuItem>
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
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses?.data?.data?.map((course, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <NavLink
                    to={`/courses/${course.id}`}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    {course.title}
                  </NavLink>
                </TableCell>
                <TableCell align="right">{course.created_at}</TableCell>
                <TableCell align="right">{course.price}$</TableCell>
                <TableCell align="right">
                  <p className="py-2 px-5 bg-almost-grey rounded-2xl inline text-blue-500 text-xs">
                    {course.status}
                  </p>
                </TableCell>
                <TableCell align="right">
                  <EditCourse id={course.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Courses;
