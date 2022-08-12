import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import ValidatedSignupForm from "./SignUp";
import ValidatedLoginForm from "./LogIn";
import Dashboard from "./Dashboard";
import history from "./history";

function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={ValidatedSignupForm} />
          <Route exact path="/signup" component={ValidatedSignupForm} />
          <Route path="/login" component={ValidatedLoginForm} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
