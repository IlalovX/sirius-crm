import { Consts } from "../routes/consts/Consts";
import { Enums } from "../routes/enums/Enums";

export const MENU = [
  { value: "Dashboard", path: Consts[Enums.MAIN] },
  { value: "Courses", path: Consts[Enums.COURSES] },
  { value: "Students", path: Consts[Enums.STUDENTS] },
  { value: "Teachers", path: Consts[Enums.TEACHERS] },
  { value: "Courses Archive", path: Consts[Enums.COURSES_ARCHIVE] },
  { value: "Students Archive", path: Consts[Enums.STUDENTS_ARCHIVE] },
  { value: "Teachers Archive", path: Consts[Enums.TEACHERS_ARCHIVE] },
];

export const ADD_NEW = [{ title: "Staff" }, { title: "Course" }];

export const ADD_COURSE = [
  { value: "Front end" },
  { value: "UX/UI Design" },
  { value: "Back end" },
  { value: "Robotics" },
  { value: "Computer literacy" },
  { value: "Theresa" },
];
