import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Props, Task } from "../../@types";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { collection, addDoc } from "firebase/firestore"; // Importe as funções necessárias do Firestore
import { db } from "../../services/firebase";
import { Snackbar } from "@mui/material";

export const TaskForm = ({ tasks, setTasks }: Props) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

      setSnackbarMessage("Task added successfully!");
      setOpenSnackbar(true);
    } catch (error: any) {
      console.error("Error adding document: ", error);
      setError("Error adding task. Please try again later.");
      setSnackbarMessage(error);
      setOpenSnackbar(true);
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

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default TaskForm;
