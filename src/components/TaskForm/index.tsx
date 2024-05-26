import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Props, Task } from "../../@types";
import {
  ButtonAdd,
  Content,
  TextFieldDescription,
  TextFieldTitle,
} from "./styles";

const TaskForm: React.FC<Props> = ({ tasks, setTasks }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "" || newTaskDescription.trim() === "") {
      return;
    }
    const newTask: Task = {
      id: uuidv4(),
      title: newTaskTitle,
      description: newTaskDescription,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  return (
    <Content>
      <TextFieldTitle
        label="New Task Title"
        variant="outlined"
        fullWidth
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <TextFieldDescription
        label="New Task Description"
        variant="outlined"
        fullWidth
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
      />
      <ButtonAdd variant="contained" color="primary" onClick={handleAddTask}>
        Add Task
      </ButtonAdd>
    </Content>
  );
};

export default TaskForm;
