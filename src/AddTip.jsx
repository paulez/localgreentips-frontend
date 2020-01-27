import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import TipEditForm from './components/TipEditForm';
import Header from './Header';

class AddTip extends Component {

  render () {
    return (
      <React.Fragment>
	<Header/>
	<Container>
	  <TipEditForm/>
	</Container>
      </React.Fragment>
    );
  }
}

export default AddTip;
