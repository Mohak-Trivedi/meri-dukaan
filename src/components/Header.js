import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";

// Added: to be able to use Link and useHistory()
import { useHistory, Link } from "react-router-dom";

const Header = ({ children, hasHiddenAuthButtons }) => {
    const history = useHistory();

    if(hasHiddenAuthButtons) // Login/Register page
    {
      return (
        <Box className="header">
          <Box className="header-title">
              <img src="logo_light.svg" alt="QKart-icon"></img>
          </Box>
          <Link to="/" className="link">
            <Button
              className="explore-button"
              startIcon={<ArrowBackIcon />}
              variant="text"
            >
              Back to explore
            </Button>
          </Link>
        </Box>
      );
    }
    else // Products page
    {
      console.log(children);
      const userName = localStorage.getItem('username');
      if(userName && userName.length>0) // Products + Logged In
      {
        return (
          <Box className="header">
            <Box className="header-title">
                <img src="logo_light.svg" alt="QKart-icon"></img>
            </Box>
            {children}
            <Stack direction="row" spacing={2}>
              <Avatar alt={userName} src="avatar.png" />
              <h3>{userName}</h3>
              <Button
                className="explore-button"
                variant="text"
                onClick={() => {
                  window.localStorage.clear();
                  window.location.reload();
                  history.push("/", { from: "Product" });
                }}
              >
                LOGOUT
              </Button>
            </Stack>
          </Box>
        );
      }
      else // Products + Logged out
      {
        return (
          <Box className="header">
            <Box className="header-title">
                <img src="logo_light.svg" alt="QKart-icon"></img>
            </Box>
            {children}
            <Stack direction="row" spacing={2}>
              <Link to="/login" className="link">
                <Button
                  className="explore-button"
                  variant="text"
                >
                  LOGIN
                </Button>
              </Link>
              <Link to="/register" className="link">
                <Button
                  variant="contained"
                >
                  REGISTER
                </Button>
              </Link>
            </Stack>
          </Box>
        );
      }
    }
};

export default Header;
