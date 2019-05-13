import React, { Component } from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import Tip from './Tip.js';

class Tips extends Component {

  render () {
    const { tips } = this.props;
    return (
      <CardColumns>
        {tips.items.map((tip) => 
          <Tip
            key={tip.id}
            title={tip.title}
            text={tip.text}
            tipper={tip.tipper}
          />
        )}
      </CardColumns>
    );
  }
}

export default Tips;
