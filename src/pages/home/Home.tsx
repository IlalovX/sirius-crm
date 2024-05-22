import {
  Avatar,
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { Fragment } from "react";
import Customer from "../../assets/svg/Customers.svg";
import CustomerNull from "../../assets/svg/CustomersNull.svg";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Courses from "../../assets/svg/Courses.svg";
import CoursesNull from "../../assets/svg/CoursesNull.svg";
import { NavLink } from "react-router-dom";
import { Consts } from "../../routes/consts/Consts";
import { Enums } from "../../routes/enums/Enums";
import EditTeacher from "../../components/edit-teacher/EditTeacher";
import { getCourses, getStudents, getStaff } from "../../services/queries";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Home() {
  const { data: teachers } = getStaff({ limit: 0, offset: 1, status: true });
  const { data: courses } = getCourses({ limit: 0, offset: 1 });
  const { data: students } = getStudents({ limit: 0, offset: 1 });

  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ flexGrow: 1 }}>
                  <div className="h-auto rounded-2xl bg-almost-blue p-10 space-y-20 shadow-xl font-bold">
                    <h1 className="text-white text-4xl font-bold">
                      Appointment
                    </h1>
                    <div className="flex space-x-5">
                      <div className="flex flex-col justify-between">
                        <h3 className="text-white text-2xl">Nukus</h3>
                        <p className="text-almost-gray text-2xl">
                          Qaraqalpaqstan 23
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-10">
                      <div className="space-y-2 ">
                        <h4 className="text-2xl text-almost-gray">Room</h4>
                        <p className="text-white text-2xl">№204</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-2xl text-almost-gray">People</h4>
                        <p className="text-white text-2xl">
                          {teachers?.data?.data
                            ? teachers?.data?.data?.length
                            : 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <div className="shadow-2xl flex justify-between items-center p-10 rounded-2xl">
                  <div className="space-y-5">
                    <h2 className="text-3xl">Students</h2>
                    <p className="text-4xl">
                      {students?.data?.data.length ? students?.data?.total : 0}
                    </p>
                  </div>

                  {students?.data?.data ? (
                    <img src={Customer} className="w-28 h-28" />
                  ) : (
                    <img src={CustomerNull} className="w-28 h-28" />
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="shadow-2xl flex justify-between items-center p-10 rounded-2xl">
                  <div className="space-y-5">
                    <h2 className="text-3xl">Courses</h2>
                    <p className="text-4xl">
                      {courses?.data?.data?.length
                        ? courses?.data?.data?.length
                        : 0}
                    </p>
                  </div>
                  {courses?.data?.data ? (
                    <img src={Courses} className="w-28 h-28" />
                  ) : (
                    <img src={CoursesNull} className="w-28 h-28" />
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ flexGrow: 1 }} className="!h-[100%]">
              <div className="min-h-[100%] shadow-xl rounded-2xl p-10">
                <header className="flex justify-between items-center">
                  <h2 className="text-2xl">Course in progress</h2>
                  <NavLink
                    to={Consts[Enums.COURSES]}
                    className="text-blue-700 "
                  >
                    View All
                  </NavLink>
                </header>
                <Box sx={{ flexGrow: 1 }}>
                  {!!courses?.data?.data?.length ? (
                    <List
                      sx={{
                        width: "100%",
                      }}
                    >
                      {courses?.data?.data?.map((course, index) => (
                        <Box key={index}>
                          <NavLink to={`/courses/${course.id}`}>
                            <ListItem className="!p-0">
                              <ListItemText
                                primary={
                                  <Fragment>
                                    <Typography className="flex justify-between items-center">
                                      <span className="text-2xl font-bold space-x-2">
                                        <span>{course.title}</span>
                                        <span>{course.group_id}</span>
                                      </span>
                                      <span className="text-2xl">
                                        {course.price}
                                      </span>
                                    </Typography>
                                  </Fragment>
                                }
                                secondary={
                                  <Fragment>
                                    <Typography
                                      className="text-end"
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      <span className="text-almost-gray space-x-2">
                                        <span>
                                          {course?.lesson_days === "EVEN_DAYS"
                                            ? "Пн, Ср, Пт"
                                            : "Вт, Чт, Сб"}
                                        </span>
                                        <span>{course.lesson_time}</span>
                                      </span>
                                    </Typography>
                                  </Fragment>
                                }
                              />
                            </ListItem>
                          </NavLink>
                          <Divider variant="fullWidth" component="li" />
                        </Box>
                      ))}
                    </List>
                  ) : (
                    <Box className="!h-[100%] text-center flex items-center justify-center mt-10">
                      <Box>
                        <LocalMallIcon sx={{ width: 40, height: 40 }} />
                        <Typography variant="body2" component="p" fontSize={25}>
                          No courses in progress.
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </div>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ flexGrow: 1 }} className="h-[100%]">
              <div className="min-h-[100%] shadow-xl rounded-2xl p-10">
                <header className="flex justify-between items-center">
                  <h2 className="text-2xl">Teacher</h2>
                  <NavLink
                    to={Consts[Enums.TEACHERS]}
                    className="text-blue-700 "
                  >
                    View All
                  </NavLink>
                </header>
                <Box sx={{ flexGrow: 1 }}>
                  {!!teachers?.data?.data?.length ? (
                    <List
                      sx={{
                        width: "100%",
                      }}
                    >
                      {teachers?.data?.data?.map((teacher, index) => (
                        <Box key={index}>
                          <ListItem
                            className="!p-0"
                            secondaryAction={<EditTeacher id={teacher.id} />}
                          >
                            <NavLink
                              to={`/teachers/${teacher.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center"
                            >
                              <ListItemAvatar>
                                <Avatar sx={{ height: 50, width: 50 }}>
                                  {teacher.first_name[0]}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <span className="text-2xl">
                                    {teacher.first_name}
                                  </span>
                                }
                                secondary={
                                  <Fragment>
                                    <Typography
                                      sx={{ display: "inline" }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      {teacher?.tg_username}
                                    </Typography>
                                  </Fragment>
                                }
                              />
                            </NavLink>
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </Box>
                      ))}
                    </List>
                  ) : (
                    <Box className="!h-[100%] text-center flex items-center justify-center mt-10">
                      <Box>
                        <AccountCircleIcon sx={{ width: 40, height: 40 }} />
                        <Typography variant="body2" component="p" fontSize={25}>
                          No teachers found.
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}

export default Home;
