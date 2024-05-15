import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $host } from "./requestServices";
import { useGroupData, useStaffData } from "../types/MutationTypes";

export function useAddStaff() {
  return useMutation({
    mutationFn: async (data: useStaffData) => {
      const res = await $host.post("/staff", data);
      return res;
    },
  });
}

export function useAddGroup() {
  return useMutation({
    mutationFn: async (data: useGroupData) => {
      const res = await $host.post("/group", data);
      return res;
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
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getStudents"] });
    },
  });
}
