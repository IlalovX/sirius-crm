import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $host } from "../../../services/requestServices";
import { useStudentData } from "../../../types/MutationTypes";

export function useAddStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: useStudentData) => {
      const res = await $host.post("/student", data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCourseDetail"],
      });
    },
  });
}
