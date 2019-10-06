import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import HeaderLogin from './components/HeaderLogin';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
    };
  }


  render () {
    return (
      <Navbar
        bg="primary"
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="mb-4"
        >
        <LinkContainer to="/">
          <Navbar.Brand>
            Local Green Tips
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
        <Nav className="mr-auto">
          <LinkContainer to='/about'>
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
        </Nav>
        <HeaderLogin user={this.props.user} />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStatetoProps(state) {
  const { user } = state;
  return {
    user
  };
}

export default connect(mapStatetoProps)(Header);
