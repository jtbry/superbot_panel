import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import LoginImage from '../assets/images/login_image.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return(
      <Container className="mt-5">
        <Card>
          <Card.Body>
            <div className="login-header">
              <h3>Superbot Controls Login</h3>
              <img src={LoginImage} className="login-logo" alt="Super Bot Login" />
            </div>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="login" type="submit" size="lg" block>
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Login;