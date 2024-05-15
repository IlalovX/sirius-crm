import { useMutation } from "@tanstack/react-query";
import { $host } from "../../../services/requestServices";

export function useAddStudent() {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await $host.post("/staff", data);
      return res;
    },
  });
}
