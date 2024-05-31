import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Enums } from "./enums/Enums";
import { Consts } from "./consts/Consts";

const Layout = lazy(() => import("../layout/Layout"));

const Main = lazy(() => import("../pages/home/Home"));

const Students = lazy(() => import("../pages/students/Students"));
const StudentsArchive = lazy(
  () => import("../pages/students-archive/StudentsArchive")
);
const StudentDetail = lazy(
  () => import("../pages/student-detail/StudentDetail")
);

const Courses = lazy(() => import("../pages/courses/Courses"));
const CoursesArchive = lazy(
  () => import("../pages/courses-archive/CoursesArchive")
);
const CoursesDetails = lazy(
  () => import("../pages/course-detail/CourseDetail")
);

const Teachers = lazy(() => import("../pages/teachers/Teachers"));
const TeachersArchive = lazy(
  () => import("../pages/teachers-archive/TeachersArchive")
);
const TeacherDetail = lazy(
  () => import("../pages/teacher-detail/TeacherDetail")
);

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
            path={Consts[Enums.COURSES_ARCHIVE]}
            element={
              <Suspense>
                <CoursesArchive />
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
            path={Consts[Enums.STUDENTS_ARCHIVE]}
            element={
              <Suspense>
                <StudentsArchive />
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
            path={Consts[Enums.TEACHERS]}
            element={
              <Suspense>
                <Teachers />
              </Suspense>
            }
          />
          <Route
            path={Consts[Enums.TEACHERS_ARCHIVE]}
            element={
              <Suspense>
                <TeachersArchive />
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
