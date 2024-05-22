import { useQuery } from "@tanstack/react-query";
import { $host } from "../../../services/requestServices";
import { getCourseDetailType } from "../types/QueriesTypes";

export function getCourseDetail({ id, open }: { id: string; open: boolean }) {
  return useQuery<getCourseDetailType, any>(
    ["getCourseDetail", id],
    async () => {
      const res = await $host.get(`/group/${id}`);
      return res.data;
    },
    {
      enabled: !!id && open,
      refetchOnWindowFocus: false,
    }
  );
}
