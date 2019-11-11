import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Header from './Header';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      registered: false,
    };
  }

  setRegistered = (status) => {
    this.setState( { registered: status });
  }
  
  render () {
    if (!this.state.registered) {
      return (
	<React.Fragment>
          <Header/>
          <Container>
            <Row>
              <Col md={{span: 6, offset: 4}}>
		<RegisterForm
		  setRegistered={this.setRegistered}/>
              </Col>
            </Row>
          </Container>
	</React.Fragment>
      );
    } else {
      return (
	<React.Fragment>
          <Header/>
          <Container>
            <Row>
              <Col md={{span: 6, offset: 4}}>
		<Alert variant="success">
		  You have successfully registered, please login.
		</Alert>
		<LoginForm/>
              </Col>
            </Row>
          </Container>
	</React.Fragment>
      );
    }
  }
}

export default Register;


