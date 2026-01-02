import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => {

  const isAuth = localStorage.getItem("isAuth") === "true";
  // const email = localStorage.getItem("email");
  // const password = localStorage.getItem("password");

  const logout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location.href = '/';
    window.location.reload();
  }

  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>

        {isAuth ? (
          <>
            {/* <Typography variant="body1" sx={{ marginRight: 2 }}>
              Welcome, {email}!
            </Typography> */}
            <Button color="inherit" onClick={logout} component={Link} to="/logout">Logout</Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">Login</Button>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;