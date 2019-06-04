import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

class Tip extends Component {

  username() {
    const { tipper } = this.props.tip;
    if(tipper) {
      return tipper.username;
    } else {
      return "";
    }
  }

  render() {
    var user = this.username();
    const { tip } = this.props;
    return (
      <Card className="Tip">
        <Card.Title className="Tip-header">
          <Link to={`/tips/${tip.id}`}>
            {tip.title}
          </Link>
        </Card.Title>
        <Card.Text>
          {tip.text}
        </Card.Text>
        <Card.Footer>
          <small>{user}</small>
        </Card.Footer>
      </Card>
    );
  }
}

export default Tip;
