import { Fragment, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Modal,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Divider } from "@mui/material";
import { useAppDispatch } from "../../utils/helpers";
import { setModalReset } from "../../store/slice/modal";
import { ADD_COURSE } from "../../db/db";
import { TimePicker } from "@mui/x-date-pickers";
import { getStaff } from "../../services/queries";
import { useEditGroup } from "./service/mutations";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 600,
  borderRadius: "20px",
  bgcolor: "background.paper",
  boxShadow: 24,
  px: 4,
  py: 2,
};

function EditCourse({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const { data: teachers } = getStaff({ limit: 0, offset: 1 });
  const editGroup = useEditGroup({ id: id });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(setModalReset());
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data) {
      editGroup
        .mutateAsync({
          description: data.get("desc") as string,
          duration: data.get("duration") as string,
          lesson_days: data.get("days") as string,
          lesson_duration: data.get("lessonDuration") as string,
          lesson_time: data.get("time") as string,
          price: Number(data.get("price")) as number,
          status: data.get("progress") as string,
          teacher_id: teachers?.data.data.find(
            (item) => item.first_name === (data.get("teacher") as string)
          )?.id as string,
          teacher_name: data.get("teacher") as string,
          title: data.get("title") as string,
        })
        .then(() => {
          handleClose();
        });
    }
  };
  return (
    <Fragment>
      <IconButton onClick={handleOpen} edge="end" aria-label="edit">
        <BorderColorIcon />
      </IconButton>
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
              Edit Course
            </Typography>
            <IconButton onClick={handleClose} edge="end" aria-label="edit">
              <CancelRoundedIcon />
            </IconButton>
          </Box>
          <Divider variant="fullWidth" />
          <Box
            sx={{ flexGrow: 1 }}
            className="my-5 space-y-5"
            component="form"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Course"
                    name="teacher"
                  >
                    {teachers?.data.data.map((teacher, index) => (
                      <MenuItem key={index} value={teacher.first_name}>
                        {teacher.first_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Course</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Course"
                    name="title"
                  >
                    {ADD_COURSE.map((course, index) => (
                      <MenuItem key={index} value={course.value}>
                        {course.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box className="flex gap-5">
                  <FormControl className="!w-1/2">
                    <InputLabel id="demo-simple-select-label" required>
                      Days
                    </InputLabel>
                    <Select name="days" label="Days">
                      <MenuItem value={"EVEN_DAYS"}>EVEN_DAYS</MenuItem>
                      <MenuItem value={"ODD_DAYS"}>ODD_DAYS</MenuItem>
                    </Select>
                  </FormControl>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label="Time" name="time" className="!w-1/2" />
                  </LocalizationProvider>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="flex gap-5">
                  <TextField
                    id="outlined-multiline-static"
                    label="Price"
                    className="!w-full"
                    name="price"
                    required
                  />
                  <FormControl className="!w-full">
                    <InputLabel id="demo-simple-select-label" required>
                      Progress
                    </InputLabel>
                    <Select label="Progress" name="progress">
                      <MenuItem value={"COMPLETED"}>COMPLETED</MenuItem>
                      <MenuItem value={"SUSPENDED"}>SUSPENDED</MenuItem>
                      <MenuItem value={"PENDING"}>PENDING</MenuItem>
                      <MenuItem value={"ACTIVE"}>ACTIVE</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} className="flex gap-5">
                <TextField
                  id="outlined-multiline-static"
                  label="Duration"
                  className="!w-full"
                  name="duration"
                  autoComplete="duration"
                  required
                />
                <FormControl className="!w-full">
                  <InputLabel id="demo-simple-select-label">
                    Lesson Duration
                  </InputLabel>
                  <Select
                    label="Lesson Duration"
                    name="lessonDuration"
                    required
                    autoComplete="lessonDuration"
                  >
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"1.5"}>1.5</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  name="desc"
                  autoComplete="desc"
                  required
                  multiline
                  rows={3}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Box className="text-end">
              <Button variant="contained" color="success" type="submit">
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Fragment>
  );
}

export default EditCourse;
