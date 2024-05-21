import { createSlice } from "@reduxjs/toolkit";
import { getStudentDetailDataType } from "../../pages/student-detail/types/QueriesTypes";

interface StateType {
  courseStudents: getStudentDetailDataType[];
}

const initialState: StateType = {
  courseStudents: [],
};

export const courseDetail = createSlice({
  name: "courseDetail",
  initialState,
  reducers: {
    setData: (state, action) => {
      const status = state.courseStudents.some(
        (item) => item.id === action.payload.id
      );

      if (!status) {
        state.courseStudents.push(action.payload);
      }
    },
  },
});

export const { setData } = courseDetail.actions;

export default courseDetail.reducer;
