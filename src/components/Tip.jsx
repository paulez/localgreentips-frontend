import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class Tip extends Component {

  username() {
    if (!this.props.tip)
      return "";
    const { tipper } = this.props.tip;
    if(tipper) {
      return tipper.username;
    } else {
      return "";
    }
  }

  render() {
    const { tip } = this.props;
    return (
      <Card className="Tip">
        <Card.Body>
          <Card.Title className="Tip-header">
            <Link to={`/tip/${tip.id}`}>
              {tip.title}
            </Link>
          </Card.Title>
          <Card.Text>
            <ReactMarkdown source={tip.text} />
          </Card.Text>
          {tip.cities.map(
            (city) =>
              <Badge variant="primary">{city.name}</Badge>
          )}
      {tip.subregions.map(
            (subregion) =>
              <Badge variant="secondary">{subregion.name}</Badge>
      )}
      {tip.regions.map(
            (region) =>
              <Badge variant="warning">{region.name}</Badge>
      )}
      {tip.countries.map(
            (country) =>
              <Badge variant="info">{country.name}</Badge>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default Tip;
