import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../utils/helpers";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { setModalCourseStep } from "../../../../store/slice/modal";
import { useAddGroup } from "../../../../services/mutations";
import { getStaffDetail } from "../../../../pages/teacher-detail/services/queries";

function AddCourse({ onClose }: { onClose: () => void }) {
  const { teacherId, course } = useAppSelector((item) => item.modal);
  const { data: teacher } = getStaffDetail({
    id: teacherId as string,
    status: true,
  });
  const dispatch = useAppDispatch();
  const addGroup = useAddGroup();

  const handleChangeTeacher = () => {
    dispatch(setModalCourseStep(2));
  };

  const handleChangeCourse = () => {
    dispatch(setModalCourseStep(1));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (data) {
      addGroup
        .mutateAsync({
          description: data.get("desc") as string,
          duration: `${data.get("duration") as string} month`,
          lesson_days: data.get("days") as string,
          lesson_duration: data.get("lessonDuration") as string,
          lesson_time: data.get("time") as string,
          price: Number(data.get("price")) as number,
          status: data.get("progress") as string,
          teacher_id: teacherId as string,
          teacher_name: teacher?.data?.first_name as string,
          title: course as string,
        })
        .then(() => {
          onClose();
        });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ flexGrow: 1, minWidth: "500px" }}
      className="flex flex-col justify-between space-y-20"
    >
      <List className="space-y-5">
        <ListItem
          className="!px-0 cursor-pointer "
          secondaryAction={
            <Button
              className="!text-xs !bg-slate-300 !py-1 !px-2 !rounded-lg"
              onClick={handleChangeTeacher}
            >
              Change Teacher
            </Button>
          }
        >
          <ListItemAvatar>
            <Avatar>
              <PersonRoundedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Teacher"
            secondary={teacher?.data.first_name}
          />
        </ListItem>
        <ListItem
          className="!px-0 cursor-pointer "
          secondaryAction={
            <Button
              className="!text-xs !bg-slate-300 !py-1 !px-2 !rounded-lg"
              onClick={handleChangeCourse}
            >
              Change Course
            </Button>
          }
        >
          <ListItemText primary="Course" secondary={course} />
        </ListItem>
        <ListItem className="!p-0">
          <Box className="flex gap-5 !w-full">
            <FormControl className="!w-1/2">
              <InputLabel id="demo-simple-select-label">Days</InputLabel>
              <Select label="Days" required name="days" autoComplete="days">
                <MenuItem value={"EVEN_DAYS"}>EVEN_DAYS</MenuItem>
                <MenuItem value={"ODD_DAYS"}>ODD_DAYS</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="time"
              className="!w-1/2"
              type="time"
              label="Lesson Time"
              name="time"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </ListItem>
        <ListItem className="!p-0">
          <Box className="flex gap-5 !w-full">
            <TextField
              id="outlined-multiline-static"
              label="Price"
              className="!w-full"
              name="price"
              autoComplete="price"
              required
            />
            <FormControl className="!w-full">
              <InputLabel id="demo-simple-select-label" required>
                Progress
              </InputLabel>
              <Select
                label="Progress"
                name="progress"
                required
                autoComplete="progress"
              >
                <MenuItem value={"COMPLETED"}>COMPLETED</MenuItem>
                <MenuItem value={"SUSPENDED"}>SUSPENDED</MenuItem>
                <MenuItem value={"PENDING"}>PENDING</MenuItem>
                <MenuItem value={"ACTIVE"}>ACTIVE</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </ListItem>
        <ListItem className="!p-0">
          <Box className="flex gap-5 !w-full">
            <FormControl className="!w-full">
              <InputLabel id="demo-simple-select-label">
                Lesson Duration
              </InputLabel>
              <Select
                label="Lesson Duration"
                name="duration"
                required
                autoComplete="lessonDuration"
              >
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"6"}>6</MenuItem>
                <MenuItem value={"8"}>8</MenuItem>
              </Select>
            </FormControl>
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
          </Box>
        </ListItem>
        <ListItem className="!p-0">
          <Box sx={{ flexGrow: 1 }}>
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
          </Box>
        </ListItem>
      </List>
      <Box sx={{ flexGrow: 1 }} className="text-end space-x-5">
        <Button variant="contained" color="success" type="submit">
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default AddCourse;
