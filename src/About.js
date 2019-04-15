import React from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import Header from './Header.js';


const About = () => (
  <React.Fragment>
    <Header/>
    <Container>
      <Row>
        <Col md={{span: 6, offset: 4}}>
          Wesh
        </Col>
      </Row>
      </Container>
  </React.Fragment>
)
export default About;
