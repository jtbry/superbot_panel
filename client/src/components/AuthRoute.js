import Axios from 'axios';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Loading from './Loading'; 

class AuthRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isAuth: false, isLoaded: false}
  }

  render() {
    if(!this.state.isLoaded) {
      return(
        <Loading />
      );
    } else {
      if(this.state.isAuth) {
        return (
          <Route path={this.props.path} component={this.props.component} location={this.props.location} computedMatch={this.props.computedMatch} />
        );
      } else {
        return(
          <Redirect to="/" />
        );
      }
    }
  }

  componentDidMount() {
    Axios.get("/api/user/me")
      .then((result) => {
        if(result.status === 200) {
          this.setState({isAuth: true, isLoaded: true});
        } else {
          this.setState({isAuth: false, isLoaded: true});
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({isAuth: false, isLoaded: true});
      });
  }
}

export default AuthRoute;