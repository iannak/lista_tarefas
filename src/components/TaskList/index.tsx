import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  Pagination,
} from "@mui/material";
import { Delete, Edit, Check } from "@mui/icons-material";
import styled from "styled-components";
import { PaginationList, TableContainerList } from "./styles";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const StyledListItemText = styled(ListItemText)<{ completed: boolean }>`
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

const ITEMS_PER_PAGE = 5;

const TaskList: React.FC<Props> = ({ tasks, setTasks }) => {
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <TableContainerList>
        <List>
          {paginatedTasks.map((task) => (
            <ListItem key={task.id} button>
              <StyledListItemText
                primary={task.title}
                secondary={task.description}
                completed={task.completed}
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
        <PaginationList
          count={Math.ceil(tasks.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={handleChangePage}
        />
      </TableContainerList>
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
    </>
  );
};

export default TaskList;
