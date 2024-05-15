import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Enums } from "./enums/Enums";
import { Consts } from "./consts/Consts";

const Layout = lazy(() => import("../layout/Layout"));

const Main = lazy(() => import("../pages/home/Home"));
const Students = lazy(() => import("../pages/students/Students"));
const StudentDetail = lazy(
  () => import("../pages/student-detail/StudentDetail")
);
const Courses = lazy(() => import("../pages/courses/Courses"));
const CoursesDetails = lazy(
  () => import("../pages/course-detail/CourseDetail")
);
const Teachers = lazy(() => import("../pages/teachers/Teachers"));
const TeacherDetail = lazy(
  () => import("../pages/teacher-detail/TeacherDetail")
);
const Archive = lazy(() => import("../pages/archive/Archive"));

function PathRoutes() {
  return (
    <>
      <Routes>
        <Route
          element={
            <Suspense>
              <Layout />
            </Suspense>
          }
          path={Consts[Enums.MAIN]}
        >
          <Route
            index
            element={
              <Suspense>
                <Main />
              </Suspense>
            }
          />
          <Route
            path={Consts[Enums.COURSES_DETAILS]}
            element={
              <Suspense>
                <CoursesDetails />
              </Suspense>
            }
          />
          <Route
            path={Consts[Enums.COURSES]}
            element={
              <Suspense>
                <Courses />
              </Suspense>
            }
          />
          <Route
            path={Consts[Enums.STUDENTS]}
            element={
              <Suspense>
                <Students />
              </Suspense>
            }
          />
          <Route
            path={Consts[Enums.STUDENTS_DETAILS]}
            element={
              <Suspense>
                <StudentDetail />
              </Suspense>
            }
          />

          <Route
            path={Consts[Enums.ARCHIVE]}
            element={
              <Suspense>
                <Archive />
              </Suspense>
            }
          />
          <Route
            path={Consts[Enums.TEACHERS]}
            element={
              <Suspense>
                <Teachers />
              </Suspense>
            }
          />
          <Route
            path={Consts[Enums.TEACHERS_DETAILS]}
            element={
              <Suspense>
                <TeacherDetail />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default PathRoutes;
