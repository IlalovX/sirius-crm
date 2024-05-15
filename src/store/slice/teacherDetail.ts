import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  data: {},
};

export const teacherDetail = createSlice({
  name: "teacherDetail",
  initialState,
  reducers: {
    setTeacherDetail: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setTeacherDetail } = teacherDetail.actions;

export default teacherDetail.reducer;
