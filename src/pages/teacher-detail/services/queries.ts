import { useQuery } from "@tanstack/react-query";
import { $host } from "../../../services/requestServices";
import { useAppDispatch } from "../../../utils/helpers";
import { setTeacherDetail } from "../../../store/slice/teacherDetail";
import { getStaffDetailTypes } from "../types/QueriesTypes";

export function getTeacherDetail({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  return useQuery<getStaffDetailTypes, null>({
    queryKey: ["getTeacherDetail", id],
    queryFn: async () => {
      const res = await $host.get(`/staff/${id}`);
      dispatch(setTeacherDetail(res.data));
      return res.data;
    },
  });
}
