import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Header from './Header';
import api from './api';
import { addTip } from './actions';

class AddTip extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form_title: "",
      form_text: "",
    };
  }

  handleTitleChange = (event) => {
    this.setState( { form_title: event.target.value});
    event.preventDefault();
  }

  handleTextChange = (event) => {
    this.setState( { form_text: event.target.value});
    event.preventDefault();
  }
  
  handleSubmit = (event) => {
    console.log("post tip");
    var title = this.state.form_title;
    var text = this.state.form_text;
    api.post("tips/", {
      title: title,
      text: text,
    })
      .then(data => {
	this.props.dispatch(addTip(title, text));
	this.props.history.push("/");
      })
      .catch(error => {
	this.setState({
	  form_invalid: true,
	});
	console.log("tip create error");
      });
    event.preventDefault();
  }

  render () {
    return (
      <React.Fragment>
	<Header/>
	<Container>
	  <Form onSubmit={this.handleSubmit}>
	    <Form.Group>
	      <Form.Label>Title</Form.Label>
	      <Form.Control
		type="text"
		onChange={this.handleTitleChange} />
	    </Form.Group>
	    <Form.Group>
	      <Form.Label>Tip</Form.Label>
	      <Form.Control
		as="textarea"
		rows="5"
		onChange={this.handleTextChange} />
	    </Form.Group>

	    <Button variant="primary" type="submit">Submit</Button>
	  </Form>
	</Container>
      </React.Fragment>
    );
  }
}


function mapStatetoProps(state) {
  const { tips } = state.tips;
  return {
    tips
  };
}

const connectedAddTip = connect(mapStatetoProps)(AddTip);
export { connectedAddTip as AddTip };
