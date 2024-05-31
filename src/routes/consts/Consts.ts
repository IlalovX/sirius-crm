import { Enums } from "../enums/Enums";
import {
  getRouteCourses,
  getRouteCoursesArchive,
  getRouteCoursesDetails,
  getRouteMain,
  getRouteStudents,
  getRouteStudentsArchive,
  getRouteStudentsDetails,
  getRouteTeachers,
  getRouteTeachersArchive,
  getRouteTeachersDetails,
} from "../paths/Paths";

export const Consts: Record<Enums, string> = {
  [Enums.MAIN]: getRouteMain(),
  [Enums.COURSES]: getRouteCourses(),
  [Enums.COURSES_ARCHIVE]: getRouteCoursesArchive(),
  [Enums.COURSES_DETAILS]: getRouteCoursesDetails(""),
  [Enums.STUDENTS]: getRouteStudents(),
  [Enums.STUDENTS_ARCHIVE]: getRouteStudentsArchive(),
  [Enums.STUDENTS_DETAILS]: getRouteStudentsDetails(""),
  [Enums.TEACHERS]: getRouteTeachers(),
  [Enums.TEACHERS_ARCHIVE]: getRouteTeachersArchive(),
  [Enums.TEACHERS_DETAILS]: getRouteTeachersDetails(""),
};
