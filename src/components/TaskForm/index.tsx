import React, { useState } from "react";
import { TextField } from "@mui/material";
import { ButtonAdd, Content, FormContainer } from "./styles";
import { v4 as uuidv4 } from "uuid";
import { Props, Task } from "../../@types";

const TaskForm: React.FC<Props> = ({ tasks, setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTitle("");
    setDescription("");
  };

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
    <FormContainer onSubmit={handleSubmit}>
      <Content
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
          marginTop: "16px",
        }}
      >
        <TextField
          label="New Task Title"
          variant="outlined"
          fullWidth
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          sx={{ marginRight: "16px" }}
        />
        <TextField
          label="New Task Description"
          variant="outlined"
          fullWidth
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          sx={{ marginRight: "16px" }}
        />
        <ButtonAdd variant="contained" color="primary" onClick={handleAddTask}>
          Add Task
        </ButtonAdd>
      </Content>
    </FormContainer>
  );
};

export default TaskForm;
