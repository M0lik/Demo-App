import * as React from "react";
import { useHistory } from "react-router";

import { useSelector, useDispatch } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { userSelector } from "../redux/auth/userSlice";
import { logOutUser } from "../redux/auth/userSlice";

export default function NavBar({ title }) {
  const history = useHistory();
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const logout = () => {
    dispatch(logOutUser());
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="bottom_small_spacing">
      <AppBar position="static">
        <Toolbar>
          <Stack spacing={2} direction="row">
            <Button
              onClick={() => {
                history.push("/");
              }}
              sx={{
                "&.MuiButton-text": { color: "#FFFFFF" },
              }}
              variant="text"
            >
              View Bookings
            </Button>
            <Button
              onClick={() => {
                history.push("/newBooking");
              }}
              variant="text"
              sx={{
                "&.MuiButton-text": { color: "#FFFFFF" },
              }}
            >
              New Booking
            </Button>
            <Button
              onClick={() => {
                history.push("/deleteBooking");
              }}
              variant="text"
              sx={{
                "&.MuiButton-text": { color: "#FFFFFF" },
              }}
            >
              Delete Booking
            </Button>
          </Stack>
          <div style={{ flexGrow: "1" }}></div>
          {user.isAuthenticated && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    logout();
                    handleClose();
                  }}
                >
                  LogOut
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
