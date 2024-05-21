export const getRouteMain = () => {
  return "/";
};
export const getRouteCourses = () => {
  return "/courses";
};
export const getRouteCoursesDetails = (id: string) => {
  if (id) {
    return `/courses/${id}`;
  }
  return "/courses/:id";
};
export const getRouteTeachers = () => {
  return "/teachers";
};
export const getRouteTeachersDetails = (id: string) => {
  if (id) {
    return `/teachers/${id}`;
  }
  return "/teachers/:id";
};
export const getRouteStudents = () => {
  return "/students";
};
export const getRouteStudentsDetails = (id: string) => {
  if (id) {
    return `/students/${id}`;
  }
  return "/students/:id";
};
