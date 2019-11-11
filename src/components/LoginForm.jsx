import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api from '../api';
import { login } from '../actions';

class LoginForm extends Component {
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
    );
  }
}

function mapStatetoProps(state) {
  const { username } = state.user;
  return {
    username
  };
}

const connectedLoginForm = withRouter(connect(mapStatetoProps)(LoginForm));
export { connectedLoginForm as LoginForm };
