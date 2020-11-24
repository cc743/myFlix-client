import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Link } from "react-router-dom";

import './director-view.scss'

export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {

    const { movie } = this.props;

    if (!movie) return null;

    return (

      <div className = "director-view">
        <Container>
          <div className = "director-name">
            <span className = "label">Name: </span>
            <span className = "value">{movie.Director.Name}</span>
          </div>
          <div className = "director-bio">
            <span className = "label">Bio: </span>
            <span className = "value">{movie.Director.Bio}</span>
          </div>
          <div className = "director-birth">
            <span className = "label">Birth: </span>
            <span className = "value">{movie.Director.Birth}</span>
          </div>
          <div className = "director-death">
            <span className = "label">Death: </span>
            <span className = "value">{movie.Director.Death}</span>
          </div>
          <Row>
            <Link to = {`/movies/${movie._id}`}>
              <Button className="back-button" variant="link">Go Back</Button>
            </Link>
          </Row>
        </Container>
      </div>

    );
  }
}

DirectorView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool
  }),
};