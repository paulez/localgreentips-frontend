import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import './App.css';
import Header from './Header.js';
import Tip from './components/Tip.js';
import { fetchTipsIfNeeded } from './actions';

class TipPage extends Component {

  componentDidMount() {
    this.props.dispatch(fetchTipsIfNeeded());
  }

  componentDidUpdate() {
    this.props.dispatch(fetchTipsIfNeeded());
  }

  render() {
    const { tip } = this.props
    if (tip) {
      return (
        <React.Fragment>
          <Header />
          <Container>
            <Row className="Tips-list">
              <Col md={{ span: 8, offset: 2 }}>
                <Tip tip={tip} />
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Header />
          <Container>
            <Row className="Tips-list">
              <Col md={{ span: 4, offset: 2 }}>
                <Alert variant="danger">
                  This tip doesn't exist!
                </Alert>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      );
    }
  }
}

function mapStatetoProps(state, ownProps) {
  const { tips } = state;
  const index = Number(ownProps.match.params.index);
  const tip = tips.items.find( tip => tip.id === index);
  return {
    tip
  };
}

export default connect(mapStatetoProps)(TipPage);
