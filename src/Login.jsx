import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from './Header';
import api from './api';
import { login } from './actions';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form_username: "",
      form_email: "",
      form_invalid: null,
    };
  }

  handleSubmit = (event) => {
    var form_username = this.state.form_username;
    api.post("auth/token/login/", {
      username: form_username,
      password: this.state.form_password,
    })
    .then(result => {
      this.props.dispatch(login(form_username, result.data.auth_token));
      this.props.history.push("/");
    })
      .catch(error => {
        console.log(error);
        this.setState({
          form_invalid: true,
        });
        console.log("login error");
      });
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
    this.usernameInput.focus();
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
                    isInvalid={this.state.form_invalid}
                    ref={ref => { this.usernameInput = ref; }}/>
                </Form.Group>
                 <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    isInvalid={this.state.form_invalid}
                    onChange={this.handlePasswordChange} />
                  <Form.Control.Feedback type="invalid">
                    Cannot login, please retry with a different username or password.
                  </Form.Control.Feedback>
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


function mapStatetoProps(state) {
  const { username } = state.user;
  return {
    username
  };
}

const connectedLogin = connect(mapStatetoProps)(Login);
export { connectedLogin as Login };
