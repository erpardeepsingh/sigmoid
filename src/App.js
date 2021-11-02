import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Login from "./app/login";
import Dashboard from "./app/dashboards";
import "./App.css";
function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute
          restricted={true}
          path="/login"
          exact
          component={Login}
        />
        <PrivateRoute component={Dashboard} path="/" exact />
      </Switch>
    </Router>
  );
}

export default App;
