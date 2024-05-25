import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
} from "@mui/material";
import { Delete, Edit, Check } from "@mui/icons-material";
import styled from "styled-components";
import { TableContainerList } from "./styles";

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

const StyledTableCell = styled(TableCell)<{ completed: boolean }>`
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

const TaskList: React.FC<Props> = ({ tasks, setTasks }) => {
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

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

  return (
    <>
      <TableContainerList>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: "150px" }}>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <StyledTableCell completed={task.completed}>
                  {task.title}
                </StyledTableCell>
                <StyledTableCell completed={task.completed}>
                  {task.description}
                </StyledTableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEditOpen(task)} size="small">
                    <Edit sx={{ color: "orange" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(task.id)}
                    size="small"
                  >
                    <Delete sx={{ color: "red" }} />
                  </IconButton>
                  <Checkbox
                    icon={<Check sx={{ color: "green" }} />}
                    checkedIcon={<Check sx={{ color: "green" }} />}
                    checked={task.completed}
                    onChange={() => handleToggleCompleted(task.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
