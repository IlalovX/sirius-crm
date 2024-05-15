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
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CircleIcon from "@mui/icons-material/Circle";
import { Fragment } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../../utils/helpers";
import { useState } from "react";
import { setModalReset } from "../../store/slice/modal";
import AddStudent from "../../components/add-student/AddStudent";
import { getCourseDetail } from "./services/queries";
import { getTeacherDetail } from "../teacher-detail/services/queries";

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
  const { data: course } = getCourseDetail();
  const { data: teacher } = getTeacherDetail({
    id: course?.data?.teacher_id as string,
  });

  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    dispatch(setModalReset());
    setOpen(false);
  };

  return (
    <Box>
      <List className="space-y-10">
        <Box className="flex gap-5">
          <ListItem className="!p-0">
            <ListItemAvatar>
              <Avatar sx={{ height: 70, width: 70, marginRight: "10px" }}>
                {teacher?.data.first_name}
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
                  <span>{course?.data?.lesson_days}</span>
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
                {/* {course?.data?.map((row, index) => (
							<TableRow key={row.label}>
							<TableCell component="th" scope="row">
								<Avatar
									sx={{ height: 40, width: 40 }}
									alt={row.label}
									src={row.photo}
								/>
							</TableCell>
							<TableCell component="th" scope="row">
								<NavLink to={`/students/${+index + 1}`}>
									{row.label}
								</NavLink>
							</TableCell>
							<TableCell align="right">{row.telegram}</TableCell>
							<TableCell align="right">{row.phone}</TableCell>
							<TableCell align="right">{row.course}</TableCell>
							<TableCell align="right">{row.comment}</TableCell>
							<TableCell align="right">{row.record}</TableCell>
							<TableCell align="right">
								<IconButton edge="end" aria-label="delete">
									<DeleteIcon />
								</IconButton>
							</TableCell>
							<TableCell align="right">
								<EditStudent id="1" />
							</TableCell>
							</TableRow>
						))} */}
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
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default CourseDetail;
