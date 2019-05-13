import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import Header from './Header.js';
import Tips from './components/Tips.js';
import { fetchTipsIfNeeded } from './actions';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: {},
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchTipsIfNeeded());
  }

  componentDidUpdate() {
    this.props.dispatch(fetchTipsIfNeeded());
  }

  render() {
    const { user, tips } = this.props
    return (
      <React.Fragment>
        <Header user={user} />
        <Container>
          <Row className="Tips-list">
            <Col md={{ span: 8, offset: 2 }}>
              {tips.items.length > 0 && (
                <Tips tips={tips} />
              )}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

function mapStatetoProps(state) {
  const { user, tips } = state;
  return {
    user,
    tips
  };
}

export default connect(mapStatetoProps)(App);
