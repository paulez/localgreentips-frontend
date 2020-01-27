import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import TipEditForm from './components/TipEditForm';
import Header from './Header';

class EditTip extends Component {

  render () {
    return (
      <React.Fragment>
	<Header/>
	<Container>
	  <TipEditForm tip={this.props.tip}/>
	</Container>
      </React.Fragment>
    );
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
    tip
  };
}

export default connect(mapStatetoProps)(EditTip);
