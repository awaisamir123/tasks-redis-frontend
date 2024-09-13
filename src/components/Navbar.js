import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/AssignmentTurnedIn';


const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
      <AssignmentIcon sx={{ fontSize: '28px', mr: 1 }} />
        <Typography variant="h6">Task Management Dashboard</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

