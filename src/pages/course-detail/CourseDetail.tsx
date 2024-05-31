import { Fragment, useState } from "react";
import { useAppDispatch } from "../../utils/helpers";
import { NavLink, useParams } from "react-router-dom";

// mui
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button,
  Divider,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// icons
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import CircleIcon from "@mui/icons-material/Circle";
import AddIcon from "@mui/icons-material/Add";

// react-query
import { getCourseDetail } from "./services/queries";
import { getStaffDetail } from "../teacher-detail/services/queries";
import { deleteStudent } from "../../services/mutations";

import { setModalReset } from "../../store/slice/modal";
import AddStudent from "../../components/add-student/AddStudent";
import { useGetStudents } from "../../services/queries";
import { getCourseDetailType } from "./types/QueriesTypes";
import { getStudentDetailType } from "../student-detail/types/QueriesTypes";
import EditStudent from "../../components/edit-student/EditStudent";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  borderRadius: "20px",
  bgcolor: "background.paper",
  boxShadow: 24,
  px: 4,
  py: 2,
};

function CourseDetail() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const delStudent = deleteStudent();
  const { data: course } = getCourseDetail({ id: id as string, open: true });
  const { data: teacher } = getStaffDetail({
    id: course?.data?.teacher_id as string,
    status: true,
  });

  const studentsQueries = useGetStudents({
    course: course as getCourseDetailType,
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    dispatch(setModalReset());
    setOpen(false);
  };

  const handleDeleteStudent = (id: string) => {
    delStudent.mutateAsync({ id: id });
  };

  return (
    <Box>
      <List className="space-y-10">
        <Box className="flex gap-5">
          <ListItem className="!p-0">
            <ListItemAvatar>
              <Avatar sx={{ height: 70, width: 70, marginRight: "10px" }}>
                {teacher?.data.first_name[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <span className="text-2xl">{teacher?.data.first_name}</span>
              }
              secondary={
                <Fragment>
                  <Typography
                    sx={{ display: "inline", fontSize: "20px" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {teacher?.data.tg_username}
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
          <ListItem className="!p-0">
            <ListItemText
              primary={<span className="text-2xl">Phone</span>}
              secondary={
                <Fragment>
                  <Typography
                    sx={{ display: "inline", fontSize: "20px" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {teacher?.data.phone_number}
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
        </Box>
        <ListItem className="!p-0">
          <ListItemText
            primary={
              <Fragment>
                <Typography sx={{ display: "block", fontSize: "45px" }}>
                  {course?.data.title}
                </Typography>
              </Fragment>
            }
            secondary={
              <Fragment>
                <Typography
                  sx={{
                    display: "inline",
                    fontWeight: "500",
                    fontSize: "30px",
                  }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                  className="space-x-5"
                >
                  <span>
                    {course?.data?.lesson_days === "ODD_DAYS"
                      ? "Пн, Ср, Пт"
                      : "Вт, Чт, Сб"}
                  </span>
                  <span>{course?.data?.lesson_time}</span>
                </Typography>
              </Fragment>
            }
          />
        </ListItem>
        <Box className="flex gap-5 ">
          <ListItem className="!p-0">
            <ListItemText
              primary={<span className="text-2xl">Progress</span>}
              secondary={
                <Fragment>
                  <Typography
                    sx={{ display: "inline", fontSize: "20px" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {course?.data?.status}
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
          <ListItem className="!p-0">
            <ListItemText
              primary={<span className="text-2xl">Price</span>}
              secondary={
                <Fragment>
                  <Typography
                    sx={{ display: "inline", fontSize: "20px" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {course?.data?.price}
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
        </Box>
        <ListItem className="!p-0">
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            className="!shadow-none !rounded-2xl "
            onClick={handleOpen}
          >
            Add New Student
          </Button>
        </ListItem>
        <ListItem className="!p-0">
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
                {!!studentsQueries &&
                  studentsQueries?.map(
                    (student: getStudentDetailType, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          <Avatar
                            sx={{ height: 40, width: 40 }}
                            alt={student?.data.id}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <NavLink to={`/students/${student?.data.id}`}>
                            {student?.data.first_name}
                          </NavLink>
                        </TableCell>
                        <TableCell align="right">
                          {!!student?.data.tg_username
                            ? student?.data.tg_username
                            : "Не указано"}
                        </TableCell>
                        <TableCell align="right">
                          {student?.data.phone_number}
                        </TableCell>
                        <TableCell align="right">
                          {!!student?.data.group
                            ? student?.data.group.title
                            : ""}
                        </TableCell>
                        <TableCell align="right">
                          {student?.data.comment}
                        </TableCell>
                        <TableCell align="right">
                          {new Date(student?.data.created_at).getDay() < 10
                            ? `0${new Date(student?.data.created_at).getDay()}`
                            : new Date(student?.data.created_at).getDay()}
                          .
                          {new Date(student?.data.created_at).getMonth() < 10
                            ? `0${new Date(student?.data.created_at).getDay()}`
                            : new Date(student?.data.created_at).getDay()}
                          .{new Date(student?.data.created_at).getFullYear()}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() =>
                              handleDeleteStudent(student?.data.id)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell align="right">
                          <EditStudent id={student?.data.id} />
                        </TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </ListItem>
      </List>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Student in Group
            </Typography>
            <IconButton onClick={handleClose} edge="end" aria-label="edit">
              <CancelRoundedIcon />
            </IconButton>
          </Box>
          <Divider variant="fullWidth" />
          <Box sx={{ flexGrow: 1 }}>
            <AddStudent
              id={(course?.data?.id as string) && (course?.data?.id as string)}
              handleClose={handleClose}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default CourseDetail;
