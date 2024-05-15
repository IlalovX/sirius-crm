import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Button, Typography, Modal } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Divider } from "@mui/material";
import SelectNew from "./components/select-new/SelectNew";
import { useAppDispatch, useAppSelector } from "../../utils/helpers";
import SelectCourse from "./components/select-course/SelectCourse";
import SelectTeacher from "./components/select-teacher/SelectTeacher";
import AddCourse from "./components/add-course/AddCourse";
import { setModalReset } from "../../store/slice/modal";
import AddTeacher from "./components/add-teacher/AddTeacher";

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

function AddModal() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { title, courseStep } = useAppSelector((item) => item.modal);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    dispatch(setModalReset());
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        endIcon={<AddIcon />}
        className="!shadow-none !rounded-2xl "
        onClick={handleOpen}
      >
        Add New
      </Button>
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
              {title}
            </Typography>
            <IconButton onClick={handleClose} edge="end" aria-label="edit">
              <CancelRoundedIcon />
            </IconButton>
          </Box>
          <Divider variant="fullWidth" />
          <Box sx={{ flexGrow: 1 }}>
            {title === "Add New" && <SelectNew />}
            {title === "Course" && (
              <Box>
                {courseStep === 1 && <SelectCourse />}
                {courseStep === 2 && <SelectTeacher />}
                {courseStep === 3 && <AddCourse onClose={handleClose} />}
              </Box>
            )}
            {title === "Staff" && <AddTeacher onClose={handleClose} />}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AddModal;
