import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from '../Login/Login';
import Panel from '../Panel/Panel';
import NoMatch from './NoMatch';
import './App.css';
import AuthRoute from "../AuthRoute";


function App() {
  // Render the appropriate app view
  return(
    <Router>
      <Switch>
        <AuthRoute path = "/panel" component={Panel} />
        <Route exact path="/" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
