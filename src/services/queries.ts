import { useQuery } from "@tanstack/react-query";
import { $host } from "./requestServices";
import {
  getCoursesType,
  getStaffsType,
  getStudentsType,
} from "../types/QueriesTypes";

export function getStudents({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  return useQuery<getStudentsType, any>({
    queryKey: ["getStudents"],
    queryFn: async () => {
      const res = await $host.get(
        `/student?page[limit]=${limit}&page[offset]=${offset}`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}

export function getStaff({ limit, offset }: { limit: number; offset: number }) {
  return useQuery<getStaffsType, any>({
    queryKey: ["getTeachers"],
    queryFn: async () => {
      const res = await $host.get(
        `/staff?page[limit]=${limit}&page[offset]=${offset}`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}

export function getCourses({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  return useQuery<getCoursesType, any>({
    queryKey: ["getCourses"],
    queryFn: async () => {
      const res = await $host.get(
        `/group?page[limit]=${limit}&page[offset]=${offset}`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}
