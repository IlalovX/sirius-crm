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
import { useAddStaff } from "../../../../services/mutations";

function AddTeacher({ onClose }: { onClose: () => void }) {
  const addTeacher = useAddStaff();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data) {
      addTeacher
        .mutateAsync({
          firstName: data.get("firstName") as string,
          lastName: data.get("lastName") as string,
          direction: data.get("direction") as string,
          phone: data.get("phone") as string,
          role: data.get("role") as string,
          tg_username: data.get("tg_username") as string,
        })
        .then(() => {
          onClose();
        });
    }
  };

  return (
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
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Telegram User"
            name="telegram"
            variant="outlined"
            autoComplete="lastName"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Phone"
            name="phone"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Role"
              name="role"
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
            label="Direction"
            name="direction"
            variant="outlined"
            fullWidth
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
  );
}

export default AddTeacher;
