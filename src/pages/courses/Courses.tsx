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
  IconButton,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import EditCourse from "../../components/edit-course/EditCourse";
import { getCourses } from "../../services/queries";
import { deleteCourse } from "../../services/mutations";
import { getCourseDataType } from "../../types/QueriesTypes";

function Courses() {
  const { data: courses } = getCourses({ limit: 0, offset: 1 });
  const delCourse = deleteCourse();
  const [filter, setFilter] = useState("Все");
  const [filteredCourses, setFilteredCourses] = useState(
    courses?.data?.data || []
  );
  console.log(filteredCourses);

  useEffect(() => {
    if (courses) {
      let updatedCourses: getCourseDataType[] = [...courses.data.data];
      switch (filter) {
        case "Убывание":
          updatedCourses.sort((a, b) => b.price - a.price);
          break;
        case "Возрастание":
          updatedCourses.sort((a, b) => a.price - b.price);
          break;
        case "Полный":
          updatedCourses = updatedCourses.filter(
            (course) => course.status === "COMPLETED"
          );
          break;
        case "В процессе":
          updatedCourses = updatedCourses.filter(
            (course) => course.status === "ACTIVE"
          );
          break;
        case "Приостановленый":
          updatedCourses = updatedCourses.filter(
            (course) => course.status === "SUSPENDED"
          );
          break;
        case "В ожидании":
          updatedCourses = updatedCourses.filter(
            (course) => course.status === "PENDING"
          );
          break;
        default:
          updatedCourses = courses.data.data;
          break;
      }
      setFilteredCourses(updatedCourses);
    }
  }, [courses, filter]);

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  const handleDeleteCourse = (id: string) => {
    delCourse.mutateAsync({ id: id });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <header className="flex justify-between items-center mb-5">
        <h2>Total : {courses?.data.total} courses</h2>
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
              <MenuItem value="Все">Все</MenuItem>
              <MenuItem value="Убывание">Убывание</MenuItem>
              <MenuItem value="Возрастание">Возрастание</MenuItem>
              <MenuItem value="Полный">Полный</MenuItem>
              <MenuItem value="В процессе">В процессе</MenuItem>
              <MenuItem value="Приостановленый">Приостановленый</MenuItem>
              <MenuItem value="В ожидании">В ожидании</MenuItem>
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
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Edit</TableCell>
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
                <TableCell align="right">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
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
