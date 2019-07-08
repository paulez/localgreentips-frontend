import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Tips from './components/Tips';
import { fetchTipsIfNeeded } from './actions';
import { AddTip } from './AddTip';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: {},
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchTipsIfNeeded());
  }

  componentDidUpdate() {
    this.props.dispatch(fetchTipsIfNeeded());
  }

  render() {
    const { user, tips } = this.props;
    return (
      <React.Fragment>
        <Header />
        <Container>
	  <Row className="Tip-add">
	    <Col md={{ span:2 }}>
	      <Link to="/addtip">Create Tip</Link>
	    </Col>
	  </Row>
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
