import React from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
