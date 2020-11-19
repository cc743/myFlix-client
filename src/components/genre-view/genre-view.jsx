import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Link } from "react-router-dom";

import './genre-view.scss'

export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {

    const { movie } = this.props;

    if (!movie) return null;

    return (

      <div className = "genre-view">
        <Container>
          <div className = "genre-name">
            <span className = "label">Name: </span>
            <span className = "value">{movie.Genre.Name}</span>
          </div>
          <div className = "genre-description">
            <span className = "label">Description: </span>
            <span className = "value">{movie.Genre.Description}</span>
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

GenreView.propTypes = {
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
      Birth: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool
  }),
};