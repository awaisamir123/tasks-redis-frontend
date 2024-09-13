import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { marginLeft: "-3px" },
      },
    },
  },
});

const TaskForm = ({ open, handleClose, handleSave, tasksData }) => {
  const [tasks, setTasks] = useState([
    { title: "", description: "", priority: "", status: "", deadline: "" },
  ]);
  const [errors, setErrors] = useState({});
  const isEditing = tasksData && tasksData.length > 0;

  useEffect(() => {
    if (isEditing) {
      setTasks(tasksData.map(task => ({
        ...task,
        deadline: task.deadline
          ? new Date(task.deadline).toISOString().slice(0, 16)
          : "",
      })));
    } else {
      setTasks([{ title: "", description: "", priority: "", status: "", deadline: "" }]);
    }
  }, [isEditing, tasksData]);

  const handleChange = (index, e) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, [e.target.name]: e.target.value } : task
    );
    setTasks(updatedTasks);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    tasks.forEach((task, index) => {
      if (!task.title.trim()) newErrors[`title_${index}`] = "Title is required";
      if (!task.description.trim())
        newErrors[`description_${index}`] = "Description is required";
      if (!task.priority) newErrors[`priority_${index}`] = "Priority is required";
      if (!task.status) newErrors[`status_${index}`] = "Status is required";
      if (!task.deadline) newErrors[`deadline_${index}`] = "Deadline is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleSave(tasks.map(task => ({
        ...task,
        deadline: task.deadline ? new Date(task.deadline).toISOString() : "",
      })));
      handleCloseForm();
    }
  };

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      { title: "", description: "", priority: "", status: "", deadline: "" },
    ]);
  };

  const handleRemoveTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleCloseForm = () => {
    setTasks([{ title: "", description: "", priority: "", status: "", deadline: "" }]);
    setErrors({});
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleCloseForm}>
        <DialogTitle>{isEditing ? "Edit Tasks" : "Bulk Create Tasks"}</DialogTitle>
        <DialogContent>
          {tasks.map((task, index) => (
            <div key={index} style={{ marginBottom: "16px" }}>
              <TextField
                margin="dense"
                name="title"
                label="Title"
                fullWidth
                required
                value={task.title}
                onChange={(e) => handleChange(index, e)}
                error={!!errors[`title_${index}`]}
                helperText={errors[`title_${index}`]}
              />
              <TextField
                margin="dense"
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={3}
                required
                value={task.description}
                onChange={(e) => handleChange(index, e)}
                error={!!errors[`description_${index}`]}
                helperText={errors[`description_${index}`]}
              />
              <div style={{ display: 'flex', gap: '16px' }}>
                <TextField
                  margin="dense"
                  name="priority"
                  label="Priority"
                  select
                  fullWidth
                  required
                  value={task.priority}
                  onChange={(e) => handleChange(index, e)}
                  error={!!errors[`priority_${index}`]}
                  helperText={errors[`priority_${index}`]}
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </TextField>
                <TextField
                  margin="dense"
                  name="status"
                  label="Status"
                  select
                  fullWidth
                  required
                  value={task.status}
                  onChange={(e) => handleChange(index, e)}
                  error={!!errors[`status_${index}`]}
                  helperText={errors[`status_${index}`]}
                >
                  <MenuItem value="To Do">To Do</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                </TextField>
              </div>
              <TextField
                margin="dense"
                name="deadline"
                label="Deadline"
                type="datetime-local"
                fullWidth
                required
                value={task.deadline}
                onChange={(e) => handleChange(index, e)}
                error={!!errors[`deadline_${index}`]}
                helperText={errors[`deadline_${index}`]}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              { !isEditing && (
                <IconButton onClick={() => handleRemoveTask(index)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          ))}
          { !isEditing && (
            <Button onClick={handleAddTask} startIcon={<AddIcon />} color="primary">
              Add Another Task
            </Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default TaskForm;




