import { useQuery } from "@tanstack/react-query";
import { $host } from "../../../services/requestServices";

import { getStudentDetailType } from "../types/QueriesTypes";

export function getStudentDetail({ id, open }: { id: string; open: boolean }) {
  return useQuery<getStudentDetailType, any>({
    queryKey: ["getStudentDetail", id],
    queryFn: async () => {
      const res = await $host.get(`/student/${id}`);
      return res.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!id && open,
  });
}
