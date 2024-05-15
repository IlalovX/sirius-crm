import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { Fragment } from "react";
import EditStudent from "../../components/edit-student/EditStudent";
import { getStudentDetail } from "./services/queries";
import { deleteStudent } from "../../services/mutations";
import { useNavigate } from "react-router-dom";

function StudentDetail() {
  const { data: student } = getStudentDetail();
  const delStudent = deleteStudent();
  const navigate = useNavigate();

  const handleDeleteStudent = (id: string) => {
    delStudent.mutateAsync({ id: id }).then(() => navigate("/students"));
  };

  return (
    <Box>
      <List className="space-y-5">
        <ListItem
          className="!relative"
          secondaryAction={<EditStudent id={student?.data?.id as string} />}
        >
          <ListItemAvatar className="!p-0">
            <Avatar sx={{ height: 120, width: 120 }}>F</Avatar>
          </ListItemAvatar>
          <IconButton
            edge="end"
            aria-label="delete"
            className="!absolute bottom-0 left-24"
            onClick={() => handleDeleteStudent(student?.data.id as string)}
          >
            <DeleteIcon sx={{ height: 35, width: 35, color: "red" }} />
          </IconButton>
        </ListItem>
        <Box className="flex gap-5 !w-1/2">
          <ListItem className="!p-0">
            <ListItemText
              primary="First Name"
              secondary={
                <Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    color="text.primary"
                  >
                    {student?.data.first_name}
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
          <ListItem className="!p-0">
            <ListItemText
              primary="Last Name"
              secondary={
                <Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {student?.data?.last_name}
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
        </Box>
        <Box className="flex gap-5 !w-1/2">
          <ListItem className="!p-0">
            <ListItemText
              primary="Telegram User"
              secondary={
                <Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    color="text.primary"
                  >
                    {student?.data?.tg_username}
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
          <ListItem className="!p-0">
            <ListItemText
              primary="Phone"
              secondary={
                <Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {student?.data?.phone_number}
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
        </Box>
        <Box className="flex gap-5 !w-1/2">
          <ListItem className="!p-0">
            <ListItemText
              primary="Course"
              secondary={
                <Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {student?.data?.group?.title}
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
          <ListItem className="!p-0">
            <ListItemText
              primary="Status"
              secondary={
                <Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {student?.data?.status}
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
          <ListItem className="!p-0">
            <ListItemText
              primary="Date call"
              secondary={
                <Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {student?.data?.created_at}
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
          <ListItem className="!p-0">
            <ListItemText
              primary="Comment"
              secondary={
                <Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {student?.data?.comment}
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
        </Box>
      </List>
    </Box>
  );
}

export default StudentDetail;
