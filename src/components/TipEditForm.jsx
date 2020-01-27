import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Typeahead } from 'react-bootstrap-typeahead';
import api from '../api';
import { addTip } from '../actions';
import { fetchLocationIfNeeded } from '../actions';
import { fetchCitiesIfNeeded } from '../actions/cities';

class TipEditForm extends Component {
  constructor(props) {
    super(props);
    if (props.tip) {
      this.state = {
	form_title: props.tip.title,
	form_text: props.tip.text,
	select_locations: props.tip.cities,
      };
    } else {
      this.state = {
	form_title: "",
	form_text: "",
	selected_locations: [],
      };
    }
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
    var title = this.state.form_title;
    var text = this.state.form_text;
    var tip_data = {
      "title": title,
      "text": text
    };
    var location_data = this.saveChoices();

    var postData = {
      ...tip_data,
      ...location_data,
    };

    let axiosConfig = {
      headers: {
        "Authorization": "Token " + this.props.user.token
      }
    };

    api.post("tips/", postData, axiosConfig)
      .then(result => {
	this.props.dispatch(addTip(result.data));
	this.props.history.push("/");
      })
      .catch(error => {
	this.setState({
	  form_invalid: true,
	});
      });
    event.preventDefault();
  }

  saveChoices() {
    var choices = this.state.selected_locations;
    if (choices === undefined || choices.length === 0) {
      choices = this.cityChoices().slice(0, 4);
    }

    const mapLocation = (locations) => {
      return locations.map((location) => {
	return(
	  {
	    "id": location.id,
	    "name": location.label
	  }
	);
      });
    };

    const cities = mapLocation(choices.filter((choice) => choice.type === "city"));
    const countries = mapLocation(choices.filter((choice) => choice.type === "country"));
    const regions = mapLocation(choices.filter((choice) => choice.type === "region"));
    const subregions = mapLocation(choices.filter((choice) => choice.type === "subregion"));

    return {
      "cities": cities,
      "countries": countries,
      "subregions": subregions,
      "regions": regions
    };
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
          "label": city.name,
          "type": "city"
        }
      );
    });
    const region = cities[0].region;
    const subregion = cities[0].subregion;
    const country = cities[0].country;
    const extra = [
      { "id": country.id, "label": country.name, "type": "country" },
      { "id": region.id, "label": region.name, "type": "region" }
    ];
    if (subregion) {
      extra.push(
        { "id": subregion.id, "label": subregion.name, "type": "subregion" }
      );
    }
    return [...extra, ...choices];
  }

  render () {
    const choices = this.cityChoices();
    return (
      <Form onSubmit={this.handleSubmit}>
	<Form.Group>
	  <Form.Label>Title</Form.Label>
	  <Form.Control
	    type="text"
	    onChange={this.handleTitleChange}
	    value={this.state.form_title} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Typeahead
            clearButton
            defaultSelected={choices.slice(0, 4)}
            multiple
            onChange={(selected) => this.setState({selected_locations: selected})}
            options={choices}
            placeholder="Choose locations for this tip..."
            />
        </Form.Group>
	<Form.Group>
	  <Form.Label>Tip</Form.Label>
	  <Form.Control
	    as="textarea"
	    rows="5"
	    onChange={this.handleTextChange}
	    value={this.state.form_text} />
	</Form.Group>	
	<Button variant="primary" type="submit">Submit</Button>
      </Form>
    );
  }
}

function mapStatetoProps(state) {
  const { tips, cities, user } = state;
  return {
    tips,
    cities,
    user
  };
}

export default connect(mapStatetoProps)(TipEditForm);
