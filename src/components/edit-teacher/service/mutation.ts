import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $host } from "../../../services/requestServices";
import { useStaffData } from "../../../types/MutationTypes";

export function useEditStaff({ id }: { id: string }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: useStaffData) => {
      const res = await $host.put(`/staff/${id}`, data);
      return res;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["getTeachers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getTeacherDetail"],
      });
    },
  });
}
