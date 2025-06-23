import React from "react";
import { ImArrowUpRight2 } from "react-icons/im";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box'

const NavBar = () => {
  return (
<Box sx={{ width: '100%' }}>      
<AppBar position="static" sx={{ backgroundColor: 'secondary.main' }}>
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Apprenti
            <ImArrowUpRight2 />
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      </Box>
  );
};

export default NavBar;
