import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import LoginImage from '../../assets/images/login_image.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      error: undefined,
      username: "",
      password: "",
      loggedIn: false,
      loginBtnDisabled: false
    };
  }

  loginSubmit() {
    this.setState({loginBtnDisabled: true})
    if(this.state.username.length < 3 || this.state.password.length < 3) {
      this.setState({error: "Invalid login details"});
    } else {
      Axios.post("/api/user/login", {
        "username": this.state.username,
        "password": this.state.password
      }).then((res) => {
        if(res.status === 200) {
          this.props.history.push("/dashboard");
        } else {
          this.setState({username: "", password: "", error: "Invalid login details", loginBtnDisabled: false});
        }
      }).catch((err) => {
        if(err.response.status === 403) {
          this.setState({username: "", password: "", error: "Invalid login details", loginBtnDisabled: false});
        } else {
          this.setState({error: "Unable to login", loginBtnDisabled: false});
          console.log(err);
        }
      });
    }
  }

  handleChange({target}) {
    this.setState({
      [target.name]: target.value
    })
  }

  render() {
    if(this.state.loggedIn) {
      return(
        <Redirect to="/dashboard" />
      )
    } else {
      return(
        <Container className="mt-5">
          {this.state.error !== undefined &&
            <Alert variant="danger">
              <strong>Oops!</strong> {this.state.error}
            </Alert>
          }
          {this.props.location.state.message !== undefined &&
            <Alert variant={this.props.location.state.message.type}>
              <strong>Oops!</strong> {this.props.location.state.message.content}
            </Alert>
          }
          <Card>
            <Card.Body>
              <div className="login-header">
                <h3>Superbot Controls Login</h3>
                <img src={LoginImage} className="login-logo" alt="Super Bot Login" />
              </div>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control name="username" value={this.state.username} onChange={this.handleChange} type="text" placeholder="Username" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="login" type="button" size="lg" block onClick={this.loginSubmit} disabled={this.state.loginBtnDisabled}>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      );
    }
  }

  componentDidMount() {
    Axios.get("/api/user/me")
    .then((result) => {
      if(result.status === 200) {
        this.setState({loggedIn: true});
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

export default Login;