import { useQuery } from "@tanstack/react-query";
import { $host } from "./requestServices";
import {
  getCoursesType,
  getStaffsType,
  getStudentsType,
} from "../types/QueriesTypes";

export function getStudents() {
  return useQuery<getStudentsType, any>({
    queryKey: ["getStudents"],
    queryFn: async () => {
      const res = await $host.get("/student");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}

export function getStaff() {
  return useQuery<getStaffsType, any>({
    queryKey: ["getTeachers"],
    queryFn: async () => {
      const res = await $host.get("/staff");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}

export function getCourses() {
  return useQuery<getCoursesType, any>({
    queryKey: ["getCourses"],
    queryFn: async () => {
      const res = await $host.get("/group");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}
