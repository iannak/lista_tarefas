import React, { useState } from "react";
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
  TableContainer,
  Container,
  ToggleButtonGroup,
  ListItemText,
  Pagination,
} from "@mui/material";
import { Delete, Edit, Check } from "@mui/icons-material";
import TaskForm from "../TaskForm";
import { Task, Props } from "../../@types";

const ITEMS_PER_PAGE = 5;

export const TaskList = ({ tasks, setTasks }: Props) => {
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string | null>("all");

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

  const handleSaveChanges = () => {
    const updatedTask = {
      ...editTask!,
      title: editedTitle,
      description: editedDescription,
    };
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    handleEditClose();
  };

  const handleDelete = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleToggleCompleted = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string | null
  ) => {
    setFilter(newFilter);
    setCurrentPage(1);
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

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Container component="main" maxWidth="xs">
      <TableContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "16px",
          }}
        >
          <TaskForm tasks={tasks} setTasks={setTasks} />

          <Box display="flex" mb={2}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mr: 2 }}
            />

            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilterChange}
              aria-label="all tasks"
            >
              <ToggleButton value="all" aria-label="all tasks">
                All
              </ToggleButton>
              <ToggleButton value="completed" aria-label="completed tasks">
                Completed
              </ToggleButton>
              <ToggleButton
                value="not_completed"
                aria-label="not completed tasks"
              >
                Not Completed
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        <List>
          {paginatedTasks.map((task) => (
            <ListItem key={task.id} button>
              <ListItemText primary={task.title} secondary={task.description} />
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
        <Pagination
          count={Math.ceil(filteredTasks.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={handleChangePage}
          sx={{ mt: 2 }}
        />
      </TableContainer>
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
    </Container>
  );
};

export default TaskList;
