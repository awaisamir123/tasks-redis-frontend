import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, CardActions, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid2';
import ConfirmationDialog from './ConfirmationDialog'; 

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = (id) => {
    setDeleteTaskId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteTaskId(null);
  };

  const handleConfirmDelete = () => {
    onDelete(deleteTaskId);
    handleCloseDeleteDialog();
  };

  return (
    <>
      <Grid container spacing={2}>
        {tasks?.map(task => (
          <Grid item xs={12} sm={6} md={4} key={task._id}>
            <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent style={{ flex: 1 }}>
                <Typography variant="h6" component="div">
                  {task.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {task.description}
                </Typography>
                <Typography color="textSecondary">
                  Priority: {task.priority}
                </Typography>
                <Typography color="textSecondary">
                  Status: {task.status}
                </Typography>
                <Typography color="textSecondary">
                  Deadline: {new Date(task.deadline).toLocaleString()}
                </Typography>
              </CardContent>
              <Divider />
              <CardActions style={{ justifyContent: 'flex-end' }}>
                <IconButton onClick={() => onEdit(task)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(task._id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default TaskList;


// import React, { useState } from 'react';
// import { Card, CardContent, Typography, IconButton, CardActions, Divider } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Grid from '@mui/material/Grid2';
// import ConfirmationDialog from './ConfirmationDialog';

// const TaskList = ({ tasks, onEdit, onDelete }) => {
//   const [deleteTaskId, setDeleteTaskId] = useState(null);
//   const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

//   const handleDeleteClick = (id) => {
//     setDeleteTaskId(id);
//     setDeleteDialogOpen(true);
//   };

//   const handleCloseDeleteDialog = () => {
//     setDeleteDialogOpen(false);
//     setDeleteTaskId(null);
//   };

//   const handleConfirmDelete = () => {
//     onDelete(deleteTaskId);
//     handleCloseDeleteDialog();
//   };

//   return (
//     <>
//       <Grid container spacing={2} alignItems="stretch">
//         {tasks?.map((task) => (
//           <Grid item xs={12} sm={6} md={4} key={task._id} style={{ display: 'flex' }}>
//             <Card style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%' }}>
//               <CardContent style={{ flexGrow: 1 }}>
//                 <Typography variant="h6" component="div">
//                   {task.title}
//                 </Typography>
//                 <Typography color="textSecondary" gutterBottom>
//                   {task.description}
//                 </Typography>
//                 <Typography color="textSecondary">
//                   Priority: {task.priority}
//                 </Typography>
//                 <Typography color="textSecondary">
//                   Status: {task.status}
//                 </Typography>
//                 <Typography color="textSecondary">
//                   Deadline: {new Date(task.deadline).toLocaleString()}
//                 </Typography>
//               </CardContent>
//               <Divider />
//               <CardActions style={{ justifyContent: 'flex-end' }}>
//                 <IconButton onClick={() => onEdit(task)} color="primary">
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={() => handleDeleteClick(task._id)} color="error">
//                   <DeleteIcon />
//                 </IconButton>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <ConfirmationDialog
//         open={isDeleteDialogOpen}
//         onClose={handleCloseDeleteDialog}
//         onConfirm={handleConfirmDelete}
//       />
//     </>
//   );
// };

// export default TaskList;
