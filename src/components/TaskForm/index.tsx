import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Props, Task } from "../../@types";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export const TaskForm = ({ tasks, setTasks }: Props) => {
	const [newTitle, setNewTitle] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleAddTask = () => {
		if (newTitle.trim() === "" || newDescription.trim() === "") {
			setError("Title and description and required");
			return;
		}

		setError(null);

		const newTask: Task = {
			id: uuidv4(),
			title: newTitle,
			description: newDescription,
			completed: false,
		};

		setTasks([...tasks, newTask]);
		setNewTitle("");
		setNewDescription("");
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box sx={{ width: "100%" }}>
				<TextField
					label="Title"
					variant="outlined"
					fullWidth
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
				/>
				<TextField
					label="Description"
					variant="outlined"
					fullWidth
					value={newDescription}
					onChange={(e) => setNewDescription(e.target.value)}
				/>

				{error && <Typography color="error">{error}</Typography>}

				<Button variant="contained" color="primary" onClick={handleAddTask}>
					Add Task
				</Button>
			</Box>
		</Container>
	);
};

export default TaskForm;
