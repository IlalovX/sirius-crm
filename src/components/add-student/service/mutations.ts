import { useMutation } from "@tanstack/react-query";
import { $host } from "../../../services/requestServices";
import { useStudentData } from "../../../types/MutationTypes";

export function useAddStudent() {
  return useMutation({
    mutationFn: async (data: useStudentData) => {
      const res = await $host.post("/student", data);
      return res;
    },
  });
}
