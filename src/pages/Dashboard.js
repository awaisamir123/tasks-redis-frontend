import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Container, Button, Typography, Snackbar, Alert } from '@mui/material';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`);
      if (response?.data && response?.data?.isSuccess) {
        setTasks(response?.data?.data);
      } else {
        throw new Error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const handleOpenForm = (task = null) => {
    setCurrentTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setCurrentTask(null);
  };

 const handleSaveTask = async (task) => {
    try {
      let response;
      if (task._id) {
        // Update existing task
        response = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${task._id}`, task);
        if (response.data && response.data.isSuccess) {
          setSnackbarMessage('Task updated successfully!');
        } else {
          throw new Error('Failed to update task');
        }
      } else {
        // Create new task
        response = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, task);
        if (response.data && response.data.isSuccess) {
          setSnackbarMessage('Task added successfully!');
        } else {
          throw new Error('Failed to add task');
        }
      }
      fetchTasks();
      handleCloseForm(); // Close the form after saving
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error saving task', error);
      setSnackbarMessage('Error saving task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`);
      if (response.data && response.data.isSuccess) {
        setSnackbarMessage('Task deleted successfully!');
        fetchTasks();
      } else {
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task', error);
      setSnackbarMessage('Error deleting task');
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
      <Container style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Task Management Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenForm()} 
          style={{ marginBottom: '20px' }}
        >
          Add Task
        </Button>
        <TaskList tasks={tasks} onEdit={handleOpenForm} onDelete={handleDeleteTask} />
        <TaskForm
          open={isFormOpen}
          handleClose={handleCloseForm}
          handleSave={handleSaveTask}
          task={currentTask} 
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
