import React, { useState } from "react";
import { TextField } from "@mui/material";
import { ButtonAdd, FormContainer } from "./styles";

const TaskForm: React.FC<{
  onSubmit: (title: string, description: string) => void;
}> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
      />
      <ButtonAdd type="submit" variant="contained" color="primary">
        Add Task
      </ButtonAdd>
    </FormContainer>
  );
};

export default TaskForm;
