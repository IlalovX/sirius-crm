import { useQuery } from "@tanstack/react-query";
import { $host } from "../../../services/requestServices";
import { useParams } from "react-router-dom";
import { getCourseDetailType } from "../types/QueriesTypes";

export function getCourseDetail() {
  const { id } = useParams();
  return useQuery<getCourseDetailType, any>(
    ["getCourseDetail", id],
    async () => {
      const res = await $host.get(`/group/${id}`);
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}
