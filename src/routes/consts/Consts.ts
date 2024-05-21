import { Enums } from "../enums/Enums";
import {
  getRouteCourses,
  getRouteCoursesDetails,
  getRouteMain,
  getRouteStudents,
  getRouteStudentsDetails,
  getRouteTeachers,
  getRouteTeachersDetails,
} from "../paths/Paths";

export const Consts: Record<Enums, string> = {
  [Enums.MAIN]: getRouteMain(),
  [Enums.COURSES]: getRouteCourses(),
  [Enums.COURSES_DETAILS]: getRouteCoursesDetails(""),
  [Enums.STUDENTS]: getRouteStudents(),
  [Enums.STUDENTS_DETAILS]: getRouteStudentsDetails(""),
  [Enums.TEACHERS]: getRouteTeachers(),
  [Enums.TEACHERS_DETAILS]: getRouteTeachersDetails(""),
};
