import React from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Header from './Header';


const About = () => (
  <React.Fragment>
    <Header/>
    <Container>
      <Row>
        <Col md={{span: 6, offset: 4}}>
          <Jumbotron>
            <h1>About Local Green Tips</h1>
            <p>Here you can discover and share tips to help the environment specific to where you are.</p>
            <p>The environment is different wherever you go! As such the best way to preserve varies a lot between locations. Local Green Tips is here to help on the best action you can take to help.</p>
            <p>If you have tips to share, <NavLink to="/register">register now</NavLink> and <NavLink to="/addtip">write the tip!</NavLink></p>
          </Jumbotron>
        </Col>
      </Row>
      </Container>
  </React.Fragment>
)
export default About;
