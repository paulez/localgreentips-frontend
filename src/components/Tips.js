import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardColumns from 'react-bootstrap/CardColumns';
import Tip from './Tip.js';
import { fetchTipsIfNeeded } from '../actions';

class Tips extends Component {

  componentDidMount() {
    this.props.dispatch(fetchTipsIfNeeded());
  }

  render () {
    const { tips } = this.props;
    return (
      <CardColumns>
        {tips && tips.map((tip) => 
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

function mapStatetoProps(state) {
  const { tips } = state;
  return {
    tips
  };
}

export default connect(mapStatetoProps)(Tips)
