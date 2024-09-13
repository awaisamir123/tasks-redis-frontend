import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { marginLeft: "-3px" },
      },
    },
  },
});

const TaskForm = ({ open, handleClose, handleSave, task }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    deadline: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        deadline: task.deadline
          ? new Date(task.deadline).toISOString().slice(0, 16)
          : "", // Ensure proper format
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "",
        status: "",
        deadline: "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on change
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.priority) newErrors.priority = "Priority is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.deadline) newErrors.deadline = "Deadline is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleSave({
        ...formData,
        deadline: formData.deadline
          ? new Date(formData.deadline).toISOString()
          : "", // Ensure proper format
      });
      handleCloseForm();
    }
  };

  const handleCloseForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "",
      status: "",
      deadline: "",
    });
    setErrors({}); // Clear errors on close
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleCloseForm}>
        <DialogTitle>{task ? "Edit Task" : "New Task"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            required
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={3}
            required
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            margin="dense"
            name="priority"
            label="Priority"
            select
            fullWidth
            required
            value={formData.priority}
            onChange={handleChange}
            error={!!errors.priority}
            helperText={errors.priority}
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
            value={formData.status}
            onChange={handleChange}
            error={!!errors.status}
            helperText={errors.status}
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            name="deadline"
            label="Deadline"
            type="datetime-local"
            fullWidth
            required
            value={formData.deadline}
            onChange={handleChange}
            error={!!errors.deadline}
            helperText={errors.deadline}
            InputLabelProps={{
              shrink: true,
            }}
          />
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
