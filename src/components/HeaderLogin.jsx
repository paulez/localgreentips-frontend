import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import api from '../api';
import { logout, fetchCurrentUserIfNeeded } from '../actions';

class HeaderLogin extends Component {

  constructor(props) {
    super(props);

    this.logoutClick = this.logoutClick.bind(this);

  }

  logoutClick = (event) => {
    api.post("auth/token/logout/")
      .then(
        this.props.dispatch(logout())
      )
      .catch(error => {
        console.log(error);
        console.log("logout error");
      });
    event.preventDefault();
  }

  componentDidMount() {
    this.props.dispatch(fetchCurrentUserIfNeeded());
  }

  render () {
    if (this.props.user && this.props.user.username) {
      return (
        <Nav className="mr-auto">
          <Nav.Link
            onClick={this.logoutClick}>
            Logout
          </Nav.Link>
        </Nav>
      );
    } else {
      return (
        <Nav className="mr-auto">
          <LinkContainer to='/register'>
             <Nav.Link>Register</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/login'>
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        </Nav>
      );
    }
  }
}

export default connect()(HeaderLogin);
