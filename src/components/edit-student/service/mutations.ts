import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $host } from "../../../services/requestServices";
import { useStudentData } from "../../../types/MutationTypes";

export function useEditStudent({ id }: { id: string }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: useStudentData) => {
      const res = await $host.put(`/student/${id}`, data);
      return res;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["getStudentDetail"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getStudents"],
      });
    },
  });
}
