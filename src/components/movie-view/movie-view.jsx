import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Link } from "react-router-dom";

import './movie-view.scss'

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {
      favoriteMovie: []
    };
  }

  addItem(movie) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios.put(`https://the-greatest.herokuapp.com/users/${username}/movies/${movie}`, null, {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((response) => {
      this.setState({
        favoriteMovie: response.data.favoriteMovie
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log(movie);
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (

      <div className = "movie-view">
        <Container>
          <Row>
            <Col>
              <img className="movie-poster" src={movie.ImagePath}/>
              <Row>
                <div className="movie-title">
                  <span className = "label">Title: </span>
                  <span className = "value">{movie.Title}</span>
                </div>
              </Row>
              <Row>
                <div className = "movie-description">
                  <span className = "label">Description: </span>
                  <span className = "value">{movie.Description}</span>
                </div>
              </Row>
              <Row>
                <div className = "movie-genre">
                  <Link to = {`/Genres/${movie.Genre.Name}`}>
                    <span className = "label">Genre: </span>
                    <span className = "value">{movie.Genre.Name}</span>
                  </Link>
                </div>
              </Row>
              <Row>
                <div className = "movie-director">
                  <Link to = {`/Directors/${movie.Director.Name}`}>
                    <span className = "label">Director: </span>
                    <span className = "value">{movie.Director.Name}</span>
                  </Link>
                </div>
              </Row>
            </Col>
          </Row>

          <Row>
          <Link to = {`/`}>
            <Button className="sesame-button" variant="link">Go Back</Button>
          </Link>
          </Row>
          <Row>
            <Button className="sesame-button" onClick={() => this.addItem(movie._id)}>Add to Favorites</Button>
          </Row>
        </Container>
      </div>

    );
  }
}

MovieView.propTypes = {
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