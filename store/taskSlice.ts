import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@/types";

interface TaskState {
  tasks: Task[];
  filter: "all" | "completed" | "pending";
  attendance: string[];
}

const initialState: TaskState = {
  tasks: [],
  filter: "all",
  attendance: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "completed" | "pending">
    ) => {
      state.filter = action.payload;
    },
    markAttendance: (state) => {
      const today = new Date().toISOString().split("T")[0];
      if (!state.attendance.includes(today)) {
        state.attendance.push(today);
      }
    },
  },
});

export const { addTask, editTask, setFilter, markAttendance } =
  taskSlice.actions;
export default taskSlice.reducer;
