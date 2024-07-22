import { AppDispatch, RootState } from "@/store";
import { markAttendance } from "@/store/taskSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAutoMarkAttendance = () => {
  const dispatch = useDispatch<AppDispatch>();
  const attendance = useSelector((state: RootState) => state.tasks.attendance);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!attendance.includes(today)) {
      dispatch(markAttendance());
    }
  }, [dispatch, attendance, today]);
};
