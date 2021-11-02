import React from "react";
import axios from "axios";
import { useHistory } from "react-router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function BasicTextFields() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  function checkLogin() {
    axios
      .post("https://sigviewauth.sigmoid.io/signIn", {
        email,
        password,
        rememberMe: true,
      })
      .then((response) => {
        if (
          response &&
          response.status === 200 &&
          response.data &&
          response.data.token
        ) {
          localStorage.setItem("token", response.data.token);
          history.push({
            pathname: "/",
          });
        }
      });
  }

  return (
    <div className="login-div">
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        id="standard-basic"
        label="Email"
        variant="standard"
      />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        id="standard-basic"
        label="Password"
        variant="standard"
      />
      <Button onClick={checkLogin} variant="contained">
        Login
      </Button>
    </div>
  );
}
