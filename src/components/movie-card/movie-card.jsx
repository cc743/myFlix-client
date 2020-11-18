import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './movie-card.scss'

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      //<div onClick = {() => handleClick(movie)} className = "movie-card">{movie.Title}</div>
      <Card className = "card" style={{ width: '16rem' }}>  
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body className="card-body">
          <Card.Title className="card-title">{movie.Title}</Card.Title>
          <Card.Text className="card-text">{movie.Description}</Card.Text>
          <Link to = {`/movies/${movie._id}`}>
            <Button variant="link">Open Sesame</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired 
};