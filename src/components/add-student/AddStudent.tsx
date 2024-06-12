import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useAddStudent } from "./service/mutations";

function AddStudent({
  id,
  handleClose,
}: {
  id: string;
  handleClose: () => void;
}) {
  const addStudent = useAddStudent();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      const data = new FormData(e.currentTarget);
      await addStudent
        .mutateAsync({
          first_name: data.get("firstName") as string,
          last_name: data.get("lastName") as string,
          phone_number: data.get("phone") as string,
          tg_username: data.get("tg_username") as string,
          group_id: id,
          comment: data.get("comment") as string,
          status: data.get("status") as string,
        })
        .then(() => handleClose());
    } else {
      form.reportValidity();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box component="form" onSubmit={handleSubmit} className="my-5 space-y-5">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              name="firstName"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Last Name"
              name="lastName"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Telegram User"
              name="tg_username"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Phone"
              name="phone"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Status"
                name="status"
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
  );
}

export default AddStudent;
