import { useState } from "react";
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
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Divider } from "@mui/material";
import { useAppDispatch } from "../../utils/helpers";
import { setModalReset } from "../../store/slice/modal";
import { useEditStudent } from "./services/mutations";
import { getStudentDetail } from "../../pages/student-detail/services/queries";

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

function EditStudent({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const editStudent = useEditStudent({ id: id });
  const { data: student, isLoading } = getStudentDetail({ id: id, open: open });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(setModalReset());
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      const data = new FormData(e.currentTarget);
      editStudent
        .mutateAsync({
          comment: data.get("comment") as string,
          first_name: data.get("first_name") as string,
          last_name: data.get("last_name") as string,
          tg_username: data.get("telegram") as string,
          phone_number: data.get("phone_number") as string,
          status: data.get("status") as string,
        })
        .then(() => {
          handleClose();
        });
    } else {
      form.reportValidity();
    }
  };

  return (
    <Box>
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
                  Edit Student
                </Typography>
                <IconButton onClick={handleClose} edge="end" aria-label="edit">
                  <CancelRoundedIcon />
                </IconButton>
              </Box>
              <Divider variant="fullWidth" />
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ flexGrow: 1 }}
                className="my-5 space-y-5"
              >
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                      name="first_name"
                      defaultValue={student?.data.first_name}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Last Name"
                      name="last_name"
                      variant="outlined"
                      defaultValue={student?.data.last_name}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Telegram User"
                      name="telegram"
                      variant="outlined"
                      defaultValue={student?.data.tg_username}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Phone"
                      name="phone_number"
                      variant="outlined"
                      defaultValue={student?.data.phone_number}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className="!w-full">
                      <InputLabel id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="status"
                        label="Status"
                        defaultValue={student?.data.status}
                      >
                        <MenuItem value={"ATTENDING"}>ATTENDING</MenuItem>
                        <MenuItem value={"PENDING"}>PENDING</MenuItem>
                        <MenuItem value={"SUSPENDED"}>SUSPENDED</MenuItem>
                        <MenuItem value={"COMPLETED"}>COMPLETED</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Comment"
                      name="comment"
                      multiline
                      rows={4}
                      defaultValue={student?.data.comment}
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
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default EditStudent;
