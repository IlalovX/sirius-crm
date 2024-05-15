import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import LaptopChromebookRoundedIcon from "@mui/icons-material/LaptopChromebookRounded";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useAppDispatch } from "../../../../utils/helpers";
import { ADD_COURSE } from "../../../../db/db";
import { Fragment } from "react/jsx-runtime";
import {
  setModalCourse,
  setModalCourseStep,
  setModalStep,
} from "../../../../store/slice/modal";

function SelectCourse() {
  const dispatch = useAppDispatch();

  const handleClick = (title: string) => {
    dispatch(setModalCourse(title));
    dispatch(setModalCourseStep(2));
    dispatch(setModalStep(2));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <List>
        {ADD_COURSE.map((item, index) => (
          <Fragment key={index}>
            <ListItem
              onClick={() => handleClick(item?.value as string)}
              className="!px-0 cursor-pointer"
              secondaryAction={
                <EastRoundedIcon sx={{ width: 50, height: 20 }} />
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <LaptopChromebookRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item?.value} />
            </ListItem>
            <Divider variant="fullWidth" />
          </Fragment>
        ))}
      </List>
    </Box>
  );
}

export default SelectCourse;
