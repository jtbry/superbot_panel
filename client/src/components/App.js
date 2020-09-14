import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './Login';
import Panel from './Panel';
import NoMatch from './NoMatch';
import './App.css';


class App extends React.Component {
  // App constructor to set state and handle props
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false, user: null};
  }

  // Render the appropriate app view
  render() {
    return(
      <Router>
        <Switch>
          <Route path = "/panel" component={Panel} />
          <Route exact path="/" component={Login} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
