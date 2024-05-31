import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

// mui
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

// icons
import DeleteIcon from "@mui/icons-material/Delete";

// react-query
import { getStaffDetail } from "./services/queries";
import { deleteStaff } from "../../services/mutations";

import EditTeacher from "../../components/edit-teacher/EditTeacher";

function TeacherDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const delTeacher = deleteStaff();
  const { data: teacher } = getStaffDetail({
    id: id as string,
    status: true,
  });

  const handleDeleteTeacher = () => {
    delTeacher
      .mutateAsync({ id: teacher?.data.id as string })
      .then(() => navigate("/teachers"));
  };
  return (
    <Box>
      <List className="space-y-5">
        <ListItem
          className="!relative"
          secondaryAction={<EditTeacher id={id as string} />}
        >
          <ListItemAvatar className="!p-0">
            <Avatar sx={{ height: 120, width: 120 }}>F</Avatar>
          </ListItemAvatar>
          {!teacher?.data.is_deleted && (
            <IconButton
              edge="end"
              aria-label="delete"
              className="!absolute bottom-0 left-24"
              onClick={handleDeleteTeacher}
            >
              <DeleteIcon sx={{ height: 30, width: 30 }} />
            </IconButton>
          )}
        </ListItem>
        <Box className="grid grid-cols-3 gap-5 !w-1/2">
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
                    {teacher?.data.first_name}
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
                    {teacher?.data.last_name}
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
                    {teacher?.data.tg_username}
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
                    {teacher?.data.phone_number}
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
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
                    className="space-x-5"
                  >
                    <span>
                      {!!teacher?.data?.groups.length
                        ? teacher?.data?.groups.map((item) => item.title)
                        : "Не указано"}
                    </span>
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

export default TeacherDetail;
