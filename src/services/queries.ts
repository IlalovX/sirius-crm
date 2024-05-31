import { useQueries, useQuery } from "@tanstack/react-query";
import { $host } from "./requestServices";
import {
  getCoursesType,
  getStaffsType,
  getStudentsType,
} from "../types/QueriesTypes";
import { getCourseDetailType } from "../pages/course-detail/types/QueriesTypes";

interface ParamsType {
  page: {
    limit: number;
    offset: number;
  };
  filters: {
    is_deleted: boolean;
    status?: string;
  };
}

interface PropsTypeStudentAndCourse {
  limit: number;
  offset: number;
  status?: string;
  is_deleted: boolean;
}
interface PropsTypeStaff {
  limit: number;
  offset: number;
  viewModalStatus?: boolean;
  is_deleted: boolean;
}

export function getStudents({
  limit,
  offset,
  status,
  is_deleted,
}: PropsTypeStudentAndCourse) {
  return useQuery<getStudentsType, any>({
    queryKey: ["getStudents", { limit, offset, status }],
    queryFn: async () => {
      const params: ParamsType = {
        page: { limit: limit, offset: offset },
        filters: { is_deleted: is_deleted },
      };
      if (!!status) {
        params.filters.status = status;
      }
      const res = await $host.get(`/student`, { params });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}

export function getStaff({
  limit,
  offset,
  is_deleted,
  viewModalStatus,
}: PropsTypeStaff) {
  return useQuery<getStaffsType, any>(
    ["getTeachers", { limit, offset }],
    async () => {
      const params: ParamsType = {
        page: { limit: limit, offset: offset },
        filters: { is_deleted: is_deleted },
      };

      const res = await $host.get("/staff", { params });
      return res.data;
    },
    { refetchOnWindowFocus: false, enabled: !!viewModalStatus }
  );
}

export function getCourses({
  limit,
  offset,
  status,
  is_deleted,
}: PropsTypeStudentAndCourse) {
  return useQuery<getCoursesType, any>({
    queryKey: ["getCourses", { limit, offset, status }],
    queryFn: async () => {
      const params: ParamsType = {
        page: { limit: limit, offset: offset },
        filters: { is_deleted: is_deleted },
      };
      if (!!status) {
        params.filters.status = status;
      }
      const res = await $host.get("/group", { params });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}

export function useGetStudents({ course }: { course: getCourseDetailType }) {
  const userQueries = useQueries({
    queries:
      course?.data?.students?.map((item) => {
        return {
          queryKey: ["courseStudents", course.data.students, item],
          queryFn: async () => {
            const res = await $host.get(`/student/${item}`);
            return res.data;
          },
          refetchOnWindowFocus: false,
          retry: false,
        };
      }) ?? [],
  });

  return userQueries.map((query) => query.data);
}
