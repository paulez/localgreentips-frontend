import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from './Header.js';
import api from './api.js';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form_username: "",
      form_email: "",
      form_valid: null,
      form_error: '',
    }
  }

  handleSubmit = (event) => {
    console.log("post login");
    api.post("rest-auth/login/", {
      username: this.state.form_username,
      password: this.state.form_password,
    })
    .then(data => {
      this.props.setUser(data.username);
    })
    event.preventDefault();
  }

  handleUsernameChange = (event) => {
    this.setState({ form_username: event.target.value});
    event.preventDefault();
  }

  handlePasswordChange = (event) => {
    this.setState({ form_password: event.target.value});
    event.preventDefault();
  }

  componentDidMount() {
    this.usernameInput.focus()
  }

  render () {
    return (
      <React.Fragment>
        <Header/>
        <Container>
          <Row>
            <Col md={{span: 6, offset: 4}}>
              <Form onSubmit={this.handleSubmit} >
                <Form.Group>
                  <Form.Control 
                    type="text"
                    placeholder="Enter username"
                    onChange={this.handleUsernameChange}
                    ref={ref => { this.usernameInput = ref; }}/>
                </Form.Group>
                 <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
          </Container>
      </React.Fragment>
    );
  }
}

export default Login;
