import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import Header from './Header.js';
import Tips from './components/Tips.js';

  

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: {},
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header/>
        <Container>
          <Row className="Tips-list">
            <Col md={{ span: 8, offset: 2 }}>
              <Tips/>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
