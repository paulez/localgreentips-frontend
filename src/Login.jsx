import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Header from './Header';
import { LoginForm } from './components/LoginForm';

class Login extends Component {
  
  render () {
    return (
      <React.Fragment>
        <Header/>
        <Container>
          <Row>
            <Col md={{span: 6, offset: 4}}>
             <LoginForm/>
            </Col>
          </Row>
          </Container>
      </React.Fragment>
    );
  }
}

export default Login;
