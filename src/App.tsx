import React, { useState } from "react";
import TaskList from "./components/TaskList";
import { AppContainer } from "./styles";
import { Task } from "./@types";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <AppContainer>
      <h1>Task Manager</h1>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </AppContainer>
  );
};

export default App;
