import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class UserSubtitle extends Component {
  render () {
    if(this.props.user) {
      return (
	<footer className="blockquote-footer">
	  by <cite>{this.props.user.username}</cite>
	</footer>
      );
    } else {
      return null;
    }
  }
}

class Tip extends Component {

  render() {
    const { tip } = this.props;
    return (
      <Card className="Tip">
        <Card.Body>
          <Card.Title className="Tip-header">
            <Link to={`/tip/view/${tip.id}`}>
              {tip.title}
            </Link>
          </Card.Title>
          <ReactMarkdown source={tip.text} />
	  <UserSubtitle user={tip.tipper} />
          {tip.cities.map(
            (city) =>
              <Badge key={city.id} variant="primary">{city.name}</Badge>
          )}
      {tip.subregions.map(
            (subregion) =>
          <Badge key={subregion.id} variant="secondary">{subregion.name}</Badge>
      )}
      {tip.regions.map(
            (region) =>
              <Badge key={region.id} variant="warning">{region.name}</Badge>
      )}
      {tip.countries.map(
            (country) =>
              <Badge key={country.id} variant="info">{country.name}</Badge>
      )}
        </Card.Body>
      </Card>
    );
  }
}

export default Tip;
