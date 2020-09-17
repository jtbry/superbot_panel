import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import Bot from '../Bot/Bot';
import NoMatch from '../Errors/NoMatch';
import './App.css';
import AuthRoute from "../AuthRoute";


function App() {
  // Render the appropriate app view
  return(
    <Router>
      <Switch>
        <AuthRoute path = "/dashboard" component={Dashboard} />
        <AuthRoute path = "/bot/:id" component={Bot} />
        <Route exact path="/" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
