const Task = require('../models/taskModel');
const { resSuccess, resError } = require('../utils/response');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    // Fetch tasks from the database
    const tasks = await Task.find();

    // If no tasks are found, respond with a message indicating so
    if (tasks.length === 0) {
      return res.status(404).json(resError('No tasks found', 404));
    }

    // If tasks are successfully retrieved, return the response
    res.json(resSuccess('Tasks retrieved successfully', 200, tasks));

  } catch (err) {
    // Log the error for debugging purposes
    console.error('Error fetching tasks:', err);

    // Return a detailed error response
    res.status(500).json(resError('Error fetching tasks. Please try again later.', 500));
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, priority, status, deadline } = req.body;

  if (!title || !priority || !status || !deadline) {
    return res.status(400).json(resError('Missing required fields', 400));
  }

  try {
    const newTask = new Task({
      title,
      description,
      priority,
      status,
      deadline,
    });
    const savedTask = await newTask.save();
    res.status(201).json(resSuccess('Task created successfully', 201, savedTask));
  } catch (err) {

    console.error('Error creating task:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json(resError(`Validation error: ${err.message}`, 400));
    }
    res.status(400).json(resError('Error creating task', 400));
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { title, description, priority, status, deadline } = req.body;

  // Validate required fields
  if (!title || !priority || !status) {
    return res.status(400).json(resError('Missing required fields', 400));
  }

  try {
    // Find the task by ID and update it
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, priority, status, deadline },
      { new: true, runValidators: true }
    );

    // If task not found, return 404
    if (!task) {
      return res.status(404).json(resError('Task not found', 404));
    }

    // Return success response with the updated task
    res.json(resSuccess('Task updated successfully', 200, task));
  } catch (err) {
    // Handle validation errors from MongoDB
    if (err.name === 'ValidationError') {
      return res.status(400).json(resError(`Validation Error: ${err.message}`, 400));
    }

    // Generic error handler for other errors
    res.status(500).json(resError('Error updating task', 500));
  }
};


// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    // Find and delete the task by ID
    const task = await Task.findByIdAndDelete(req.params.id);

    // If the task is not found, return 404 error
    if (!task) {
      return res.status(404).json(resError('Task not found', 404));
    }

    // Return success response after deletion
    res.json(resSuccess('Task deleted successfully', 200, task));
  } catch (err) {
    // Handle specific MongoDB errors or return a general error message
    if (err.kind === 'ObjectId') {
      return res.status(400).json(resError('Invalid task ID', 400));
    }

    // Generic error handler
    res.status(500).json(resError('Error deleting task', 500));
  }
};

