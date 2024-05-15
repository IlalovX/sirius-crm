import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
  title: string;
  course: string;
  teacherId: string;
  step: number;
  courseStep: number;
}

const initialState: ModalState = {
  title: "Add New",
  course: "",
  teacherId: "",
  step: 1,
  courseStep: 1,
};

export const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setModalCourseStep: (state, action: PayloadAction<number>) => {
      state.courseStep = action.payload;
    },
    setModalTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setModalCourse: (state, action: PayloadAction<string>) => {
      state.course = action.payload;
    },

    setModalTeacher: (state, action: PayloadAction<string>) => {
      state.teacherId = action.payload;
    },

    setModalReset: (state) => {
      (state.title = "Add New"),
        (state.courseStep = 1),
        (state.course = ""),
        (state.step = 1),
        (state.teacherId = "");
    },
  },
});

export const {
  setModalTitle,
  setModalCourse,
  setModalTeacher,
  setModalStep,
  setModalCourseStep,
  setModalReset,
} = modal.actions;

export default modal.reducer;
