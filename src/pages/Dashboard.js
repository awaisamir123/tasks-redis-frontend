import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Container, Button, Typography, Snackbar, Alert } from "@mui/material";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tasks`
      );
      if (response.data && response.data.isSuccess) {
        setTasks(response.data.data);
      } else {
        throw new Error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const handleOpenForm = (task = null) => {
    setCurrentTask(task ? [task] : null);
    setIsFormOpen(true);
    setIsEditing(!!task);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setCurrentTask(null);
    setIsEditing(false);
  };

  const handleSaveTask = async (taskData) => {
    try {
      let response;
      console.log('taskData', taskData)
      if (isEditing) {
        // Update a single task
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}/tasks/${taskData[0].id}`,
          taskData[0]
        );
        if (response.data && response.data.isSuccess) {
          setSnackbarMessage("Task updated successfully!");
        } else {
          throw new Error("Failed to update task");
        }
      } else {
        if (taskData.length === 1) {
          response = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, taskData[0]);
        } else {
          response = await axios.post(
            `${process.env.REACT_APP_API_URL}/tasks/bulk`,
            taskData
          );
        }
        
        if (response.data && response.data.isSuccess) {
          setSnackbarMessage("Tasks added successfully!");
        } else {
          throw new Error("Failed to add tasks");
        }
      }
  
      fetchTasks(); 
      handleCloseForm(); // Close the form after saving
      setSnackbarOpen(true); // Show success snackbar
    } catch (error) {
      console.error("Error saving tasks", error);
      setSnackbarMessage("Error saving tasks");
      setSnackbarOpen(true); // Show error snackbar
    }
  };
  

  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/tasks/${id}`
      );
      if (response.data && response.data.isSuccess) {
        setSnackbarMessage("Task deleted successfully!");
        fetchTasks();
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task", error);
      setSnackbarMessage("Error deleting task");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Navbar />
      <Container style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Task Management Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenForm()}
          style={{ marginBottom: "20px" }}
        >
          Add Task
        </Button>
        <TaskList
          tasks={tasks}
          onEdit={handleOpenForm}
          onDelete={handleDeleteTask}
        />
        <TaskForm
          open={isFormOpen}
          handleClose={handleCloseForm}
          handleSave={handleSaveTask}
          tasksData={currentTask}
        />
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Dashboard;
