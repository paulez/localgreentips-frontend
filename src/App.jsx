import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Tips from './components/Tips';
import { fetchTipsIfNeeded } from './actions';
import { fetchLocationIfNeeded } from './actions';

const AddTipLink = ({ user }) => {
  if(user && user.username){
    return (
      <Link to="/tip/add">Create Tip</Link>
    );
  } else {
    return (
      <div>
	Please <Link to="/register">register</Link> or <Link to="/login">login</Link> to create a tip!
      </div>
    );
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: {},
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchTipsIfNeeded());
    this.props.dispatch(fetchLocationIfNeeded());
  }

  render() {
    const { user, tips } = this.props;
    return (
      <React.Fragment>
        <Header />
        <Container>
	  <Row className="Tips-list">
	    <Col md={{ span:2 }}>
	      <AddTipLink user={user}/>
	    </Col>
            <Col md={{ span: 8 }}>
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
