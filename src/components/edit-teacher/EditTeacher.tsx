import { Fragment, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Modal,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Divider } from "@mui/material";
import { useAppDispatch } from "../../utils/helpers";
import { setModalReset } from "../../store/slice/modal";
import { useEditStaff } from "./service/mutation";
import { getStaffDetail } from "../../pages/teacher-detail/services/queries";

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

function EditTeacher({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const editStaff = useEditStaff({ id: id });
  const [open, setOpen] = useState(false);
  const { data: teacher, isLoading } = getStaffDetail({
    id: id,
    status: open,
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    dispatch(setModalReset());
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      const data = new FormData(e.currentTarget);
      editStaff
        .mutateAsync({
          first_name: data.get("firstName") as string,
          last_name: data.get("lastName") as string,
          tg_username: data.get("tg_username") as string,
          direction: data.get("direction") as string,
          phone_number: data.get("phone") as string,
          role: data.get("role") as string,
        })
        .then(() => {
          handleClose();
        });
    } else {
      form.reportValidity();
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
          {isLoading ? (
            <Box className="flex items-center justify-center">
              <span className="text-4xl">Loading...</span>
            </Box>
          ) : (
            <Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit Teacher
                </Typography>
                <IconButton onClick={handleClose} edge="end" aria-label="edit">
                  <CancelRoundedIcon />
                </IconButton>
              </Box>
              <Divider variant="fullWidth" />
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ flexGrow: 1, minWidth: "500px" }}
                className="my-5 space-y-5"
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                      name="firstName"
                      autoComplete="firstName"
                      defaultValue={teacher?.data.first_name}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Last Name"
                      name="lastName"
                      variant="outlined"
                      autoComplete="lastName"
                      defaultValue={teacher?.data.last_name}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      label="Telegram User"
                      name="tg_username"
                      variant="outlined"
                      autoComplete="tg_username"
                      defaultValue={teacher?.data.tg_username}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Phone"
                      name="phone"
                      variant="outlined"
                      defaultValue={teacher?.data.phone_number}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Role"
                        name="role"
                        autoComplete="role"
                        defaultValue={teacher?.data.role}
                        required
                      >
                        <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                        <MenuItem value={"TEACHER"}>TEACHER</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      label="Direction"
                      name="direction"
                      variant="outlined"
                      autoComplete="direction"
                      defaultValue={teacher?.data.direction}
                      required
                    />
                  </Grid>
                </Grid>
                <Box className="text-end">
                  <Button type="submit" variant="contained" color="success">
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </Fragment>
  );
}

export default EditTeacher;
