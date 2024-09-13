# Task Management Dashboard

## Overview

This project is a Task Management Dashboard where users can create, view, update, and delete tasks. It includes a Node.js backend with MongoDB for data storage.

## Project Structure
task-management-dashboard/ │ ├── backend/ │ ├── config/ │ │ └── db.js │ ├── controllers/ │ │ └── taskController.js │ ├── models/ │ │ └── taskModel.js │ ├── routes/ │ │ └── taskRoutes.js │ ├── app.js │ └── package.json │ └── README.md


## Setup

### Prerequisites

- Node.js and npm installed on your system
- MongoDB installed and running locally

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/awaisamir123/tasks-redis-frontend

2. **Navigate to the backend directory:**

cd /backend

3. **Install dependencies:**

npm install

3. **Start MongoDB:**

Ensure MongoDB is running locally:

mongod


4. **Running the Server**
To start the server with automatic restarts on file changes:

npm run dev

To start the server normally:
npm start

