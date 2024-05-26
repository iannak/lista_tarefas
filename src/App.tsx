import React, { useState } from "react";
import TaskForm from "./components/TaskForm"; // Importe Props do componente TaskForm
import TaskList from "./components/TaskList";
import { AppContainer } from "./styles";
import { Box } from "@mui/material";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <AppContainer>
      <h1>Task Manager</h1>
      <Box>
        <TaskForm tasks={[]} setTasks={setTasks} />{" "}
      </Box>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </AppContainer>
  );
};

export default App;
