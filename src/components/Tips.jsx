import React, { Component } from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import Tip from './Tip';

class Tips extends Component {

  render () {
    const { tips } = this.props;
    return (
      <CardColumns>
        {tips.items.map((tip) => 
          <Tip
            key={tip.id}
            tip={tip}
          />
        )}
      </CardColumns>
    );
  }
}

export default Tips;
