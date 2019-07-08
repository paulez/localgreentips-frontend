import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import './App.css';
import Header from './Header';
import Tip from './components/Tip';
import { fetchSingleTipIfNeeded } from './actions';

class TipPage extends Component {

  componentDidMount() {
    this.props.dispatch(fetchSingleTipIfNeeded(this.props.index));
  }

  render() {
    const { tip, tips } = this.props;
    if ( tips.isFetching ) {
      return (
        <React.Fragment>
          <Header />
          <Container>
            <Row className="Tips-list">
              <Col md={{ span: 4, offset: 2 }}>
                <Alert variant="warning">
                  Loading tip...
                </Alert>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      );
    } else if (tip) {
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
  var tip;
  if ( tips.items ) {
    tip = tips.items.find( item => item.id === index);
  } else {
    tip = undefined;
  }

  return {
    tips,
    tip,
    index
  };
}

export default connect(mapStatetoProps)(TipPage);
