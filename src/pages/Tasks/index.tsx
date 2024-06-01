import { Box } from "@mui/material";
import TaskList from "../../components/TaskList";
import { Task } from "../../@types";
import { useState } from "react";

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <Box>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </Box>
  );
};
