import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api from '../api';
import { login } from '../actions';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form_username: "",
      form_email: "",
      form_password1: "",
      form_password2: "",
      form_invalid: null,
      form_errors: []
    };
  }

  handleSubmit = (event) => {
    var form_username = this.state.form_username;
    api.post("auth/users/", {
      username: form_username,
      email: this.state.form_email,
      password: this.state.form_password1,
      re_password: this.state.form_password2
    })
    .then(result => {
      this.props.dispatch(login(form_username,result.data.key));
      this.props.setRegistered(true);
    })
      .catch(error => {
        console.log(error);
        this.setState({
          form_invalid: true,
          form_errors: error.response.data
        });
        console.log("registration error");
      });
    event.preventDefault();
  }

  handleUsernameChange = (event) => {
    this.setState({ form_username: event.target.value});
    event.preventDefault();
  }

  handleEmailChange = (event) => {
    this.setState({ form_email: event.target.value});
    event.preventDefault();
  }

  handlePassword1Change = (event) => {
    this.setState({ form_password1: event.target.value});
    event.preventDefault();
  }

  handlePassword2Change = (event) => {
    this.setState({ form_password2: event.target.value});
    event.preventDefault();
  }

  fieldHasError = (field) => {
    if (field in this.state.form_errors) {
      return this.state.form_errors[field][0];
    } else {
      return "";
    }
  }

  password2HasError = () => {
    const password2Error = this.fieldHasError("password2");
    if (password2Error) {
      return password2Error;
    } else {
      return this.fieldHasError("non_field_errors");
    }
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
            placeholder="Pick a username"
            onChange={this.handleUsernameChange}
            isInvalid={this.fieldHasError("username")}
            ref={ref => { this.usernameInput = ref; }}
            />
            <Form.Control.Feedback
              type="invalid">
              {this.fieldHasError("username")}
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            onChange={this.handleEmailChange}
            isInvalid={this.fieldHasError("email")}
            ref={ref => { this.emailInput = ref; }}
            />
            <Form.Control.Feedback
              type="invalid">
              {this.fieldHasError("email")}
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            isInvalid={this.fieldHasError("password1")}
            onChange={this.handlePassword1Change} />
          <Form.Control.Feedback
            type="invalid">
            {this.fieldHasError("password1")}
          </Form.Control.Feedback>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            isInvalid={this.password2HasError()}
            onChange={this.handlePassword2Change} />
          <Form.Control.Feedback
            type="invalid">
            {this.password2HasError()}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
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

const connectedRegisterForm = withRouter(
  connect(mapStatetoProps)(RegisterForm)
);
export { connectedRegisterForm as RegisterForm };
