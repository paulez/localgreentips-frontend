import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

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

export default Tip;
