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
import { Fragment } from "react/jsx-runtime";
import {
  setModalCourseStep,
  setModalTeacher,
} from "../../../../store/slice/modal";
import { getStaff } from "../../../../services/queries";

function SelectTeacher() {
  const dispatch = useAppDispatch();
  const { data: teachers } = getStaff();
  const handleClick = (id: string) => {
    dispatch(setModalTeacher(id));
    dispatch(setModalCourseStep(3));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <List>
        {teachers?.data?.data?.map((item, index) => (
          <Fragment key={index}>
            <ListItem
              onClick={() => handleClick(item.id)}
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
              <ListItemText
                primary={item?.first_name}
                secondary={item?.tg_username}
              />
            </ListItem>
            <Divider variant="fullWidth" />
          </Fragment>
        ))}
      </List>
    </Box>
  );
}

export default SelectTeacher;
