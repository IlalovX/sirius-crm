import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $host } from "./requestServices";
import { useGroupData, useStaffData } from "../types/MutationTypes";

export function useAddStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: useStaffData) => {
      console.log(data);

      const res = await $host.post("/staff", data);
      return res;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getTeachers"] });
    },
  });
}

export function useAddGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: useGroupData) => {
      const res = await $host.post("/group", data);
      return res;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getCourses"] });
    },
  });
}

export function deleteStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string }) => {
      const res = await $host.delete(`/staff/${data.id}`);
      return res;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getTeachers"] });
    },
  });
}

export function deleteStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string }) => {
      const res = await $host.delete(`/student/${data.id}`);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getStudents"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getCourseDetail"],
      });
    },
  });
}

export function deleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string }) => {
      const res = await $host.delete(`/group/${data.id}`);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCourses"],
      });
    },
  });
}
