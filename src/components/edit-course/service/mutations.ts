import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $host } from "../../../services/requestServices";
import { useGroupData } from "../../../types/MutationTypes";

export function useEditGroup({ id }: { id: string }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: useGroupData) => {
      const res = await $host.put(`/group/${id}`, data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCourseDetail"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getCourses"],
      });
    },
  });
}
