import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $host } from "../../../services/requestServices";

const queryClient = useQueryClient();

export function useAddStudent() {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await $host.post("/student", data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCourseDetail"] });
    },
  });
}
