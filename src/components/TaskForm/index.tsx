import React, { useState } from "react";
import {
  ButtonAdd,
  Content,
  TextFieldDescription,
  TextFieldTitle,
} from "./styled";
import { v4 as uuidv4 } from "uuid";
import { Props, Task } from "../../@types";
import { Box, Typography } from "@mui/material";

const TaskForm: React.FC<Props> = ({ tasks, setTasks }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "" || newTaskDescription.trim() === "") {
      setError("Title and description are required.");
      return;
    }
    setError(null);
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
      <Box sx={{ width: "100%" }}>
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
        {error && <Typography color="error">{error}</Typography>}
        <ButtonAdd variant="contained" color="primary" onClick={handleAddTask}>
          Add Task
        </ButtonAdd>
      </Box>
    </Content>
  );
};

export default TaskForm;
