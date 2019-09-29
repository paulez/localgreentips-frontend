import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Typeahead } from 'react-bootstrap-typeahead';
import Header from './Header';
import api from './api';
import { addTip } from './actions';
import { fetchLocationIfNeeded } from './actions';
import { fetchCitiesIfNeeded } from './actions/cities';

class AddTip extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form_title: "",
      form_text: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchLocationIfNeeded());
    this.props.dispatch(fetchCitiesIfNeeded());
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
      .then(result => {
	this.props.dispatch(addTip(result.data));
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

  cityChoices () {
    const cities = this.props.cities.items;
    if (cities === undefined || cities.length === 0) {
      return [];
    }
    const choices = this.props.cities.items.map( (city) => {
      return (
        {
          "id": city.id,
          "label": city.name
        }
      );
    });
    const region = cities[0].region;
    const country = cities[0].region.country;
    const extra = [
      { "id": country.id, "label": country.name },
      { "id": region.id, "label": region.name }
    ]
    return [...extra, ...choices];
  }

  render () {
    const choices = this.cityChoices();
    const cities = this.props.cities.items;
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
              <Form.Label>Location</Form.Label>
              <Typeahead
                clearButton
                defaultSelected={choices.slice(0, 3)}
                multiple
                options={choices}
                placeholder="Choose locations for this tip..."
                />
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
  const { tips, cities } = state;
  return {
    tips,
    cities
  };
}

const connectedAddTip = connect(mapStatetoProps)(AddTip);
export { connectedAddTip as AddTip };
