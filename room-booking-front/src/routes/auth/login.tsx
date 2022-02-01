import React, { FC } from "react";
import "Assets/css/pages/login.css";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { loginUser } from '../../redux/auth/userSlice';
import { useHistory } from 'react-router-dom'
import { userSelector } from "../../redux/auth/userSlice";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

export const Login: FC = () => {
  const user = useSelector(userSelector);

  console.log('open')
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const validation = () => {
    dispatch(loginUser({username, password}));
  };

  if (user.isAuthenticated) return <Redirect
  to={{
    pathname: "/",
  }}
/> 

  return (
    <div className="background flex">
      <Paper
        className="center flex_column"
        style={{
          width: "50%",
          height: "40%",
          backgroundColor: "rgba(255,255,255,0.5)",
        }}
      >
        <h2 style={{ color: "black", margin: "auto" }}>Room booking app</h2>
        <TextField
          id="outlined-disabled"
          label="Email"
          autoComplete="off"
          style={{ width: "80%", margin: "auto" }}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="off"
          style={{ width: "80%", margin: "auto" }}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          variant="contained"
          style={{ width: "80%", margin: "auto" }}
          onClick={validation}
        >
          LogIn
        </Button>
      </Paper>
    </div>
  );
};
