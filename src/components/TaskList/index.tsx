import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  ToggleButton,
  Box,
  Typography,
  ToggleButtonGroup,
  ListItemText,
  Pagination,
} from "@mui/material";
import { Delete, Edit, Check } from "@mui/icons-material";
import TaskForm from "../TaskForm";
import { Task, Props } from "../../@types";
import {
  collection,
  deleteDoc,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../services/firebase";

const ITEMS_PER_PAGE = 5;

const TaskList = ({ setTasks }: Props) => {
  const [tasks, setLocalTasks] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string | null>("all");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const fetchedTasks: Task[] = [];
      snapshot.forEach((doc) => {
        fetchedTasks.push({ ...doc.data(), id: doc.id } as Task);
      });
      setLocalTasks(fetchedTasks);
    });
    return () => unsubscribe();
  }, []);

  const handleEditOpen = (task: Task) => {
    setEditTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setOpenDialog(true);
  };

  const handleEditClose = () => {
    setOpenDialog(false);
    setEditTask(null);
    setEditedTitle("");
    setEditedDescription("");
  };

  const handleSaveChanges = async () => {
    if (!editTask) return;
    const updatedTask = {
      title: editedTitle,
      description: editedDescription,
    };
    try {
      await updateDoc(doc(db, "tasks", editTask.id), updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTask.id ? { ...task, ...updatedTask } : task
        )
      );
      handleEditClose();
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const handleToggleCompleted = async (taskId: string) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
    try {
      await updateDoc(doc(db, "tasks", taskId), updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearchTerm =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "completed"
        ? task.completed
        : filter === "not_completed"
        ? !task.completed
        : true;

    return matchesSearchTerm && matchesFilter;
  });

  return (
    <Box sx={{ maxWidth: 600, margin: "auto" }}>
      <TaskForm tasks={tasks} setTasks={setTasks} />
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mt: 2 }}
      />
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(e, newFilter) => setFilter(newFilter)}
        aria-label="all tasks"
        sx={{ mt: 2 }}
      >
        <ToggleButton value="all" aria-label="all tasks">
          All
        </ToggleButton>
        <ToggleButton value="completed" aria-label="completed tasks">
          Completed
        </ToggleButton>
        <ToggleButton value="not_completed" aria-label="not completed tasks">
          Not Completed
        </ToggleButton>
      </ToggleButtonGroup>
      {filteredTasks.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 2 }}>
          No tasks found.
        </Typography>
      ) : (
        <List
          sx={{
            mt: 2,
          }}
        >
          {filteredTasks.map((task) => (
            <ListItem key={task.id} disablePadding>
              <ListItemText
                primary={task.title}
                secondary={task.description}
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleEditOpen(task)} size="small">
                  <Edit sx={{ color: "orange" }} />
                </IconButton>
                <IconButton onClick={() => handleDelete(task.id)} size="small">
                  <Delete sx={{ color: "red" }} />
                </IconButton>
                <Checkbox
                  icon={<Check sx={{ color: "green" }} />}
                  checkedIcon={<Check sx={{ color: "green" }} />}
                  checked={task.completed}
                  onChange={() => handleToggleCompleted(task.id)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
      {filteredTasks.length > ITEMS_PER_PAGE && (
        <Pagination
          count={Math.ceil(filteredTasks.length / ITEMS_PER_PAGE)}
          sx={{ mt: 2 }}
        />
      )}
      <Dialog open={openDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSaveChanges}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskList;
