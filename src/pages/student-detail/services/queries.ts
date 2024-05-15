import { useQuery } from "@tanstack/react-query";
import { $host } from "../../../services/requestServices";
import { useParams } from "react-router-dom";
import { getStudentDetailType } from "../types/QueriesTypes";

export function getStudentDetail() {
  const { id } = useParams();
  return useQuery<getStudentDetailType, any>({
    queryKey: ["getStudentDetail", id],
    queryFn: async () => {
      const res = await $host.get(`/student/${id}`);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}
