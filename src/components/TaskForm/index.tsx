import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Props, Task } from "../../@types";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { collection, addDoc } from "firebase/firestore"; // Importe as funções necessárias do Firestore
import { db } from "../../services/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TaskForm = ({ tasks, setTasks }: Props) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = async () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      setError("Title and description are required");
      return;
    }

    setError(null);

    const newTask: Task = {
      id: uuidv4(),
      title: newTitle,
      description: newDescription,
      completed: false,
    };

    try {
      const docRef = await addDoc(collection(db, "tasks"), newTask);
      console.log("Document written with ID: ", docRef.id);

      setTasks([...tasks, newTask]);
      setNewTitle("");
      setNewDescription("");

      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("Error adding task. Please try again later.");
      toast.error("Error adding task. Please try again later.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />

        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          sx={{ marginTop: 2 }}
        >
          Add Task
        </Button>
      </Box>

      <ToastContainer position="top-right" autoClose={2000} />
    </Container>
  );
};

export default TaskForm;
