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
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useAppDispatch } from "../../../../utils/helpers";
import { ADD_NEW } from "../../../../db/db";
import { Fragment } from "react/jsx-runtime";
import { setModalStep, setModalTitle } from "../../../../store/slice/modal";

function SelectNew() {
  const dispatch = useAppDispatch();

  const handleClick = (title: string) => {
    dispatch(setModalTitle(title));
    dispatch(setModalStep(2));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <List>
        {ADD_NEW.map((item, index) => (
          <Fragment key={index}>
            <ListItem
              onClick={() => handleClick(item?.title as string)}
              className="!px-0 cursor-pointer"
              secondaryAction={
                <EastRoundedIcon sx={{ width: 50, height: 20 }} />
              }
            >
              <ListItemAvatar>
                <Avatar>
                  {item?.title == "Course" ? (
                    <LaptopChromebookRoundedIcon />
                  ) : (
                    <PersonRoundedIcon />
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item?.title} />
            </ListItem>
            <Divider variant="fullWidth" />
          </Fragment>
        ))}
      </List>
    </Box>
  );
}

export default SelectNew;
