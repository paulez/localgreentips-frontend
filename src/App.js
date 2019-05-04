import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import api from './api.js';
import Header from './Header.js';


class Tip extends Component {

  username() {
    if(this.props.tipper) {
      return this.props.tipper.username;
    } else {
      return "";
    }
  }

  render() {
    return (
      <Card className="Tip">
        <Card.Title className="Tip-header">
          {this.props.title}
        </Card.Title>
        <Card.Text>
          {this.props.text}
        </Card.Text>
        <Card.Footer>
          <small>{this.username}</small>
        </Card.Footer>
      </Card>
    );
  }
}
  

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      position: {},
    }
  }

  componentDidMount() {
    this.updateTips();
  }

  updateTips() {
    api.get("tips/")
    .then(results => {
      let tips = results.data.results.map((tip) => {
        return(
          <Tip
            key={tip.id}
            title={tip.title}
            text={tip.text}
            tipper={tip.tipper}
          />
        )
      })
      this.setState({
        tips: tips,
      });
    })
    .catch(err => console.log("fetch error", err))
  }


  render() {
    return (
      <React.Fragment>
        <Header/>
        <Container>
          <Row className="Tips-list">
            <Col md={{ span: 8, offset: 2 }}>
              <CardColumns>
                {this.state.tips}
              </CardColumns>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
