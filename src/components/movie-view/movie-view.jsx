import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, goBack } = this.props;

    if (!movie) return null;

    return (
      /* <div className = "movie-view">
        <img className = "movie-poster" src = {movie.ImagePath} />
        <div className = "movie-title">
          <span className = "label">Title: </span>
          <span className = "value">{movie.Title}</span>
        </div>

        <div className = "movie-description">
          <span className = "label">Description: </span>
          <span className = "value">{movie.Description}</span>
        </div>

        <div className = "movie-genre">
          <span className = "label">Genre: </span>
          <span className = "value">{movie.Genre.Name}</span>
        </div>

        <div className = "movie-director">
          <span className = "label">Director: </span>
          <span className = "value">{movie.Director.Name}</span>
        </div>

        <div>
          <button onClick = {() => goBack()} className = "back-button">Back</button>
        </div>
      </div> */

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
                  <span className = "label">Genre: </span>
                  <span className = "value">{movie.Genre.Name}</span>
                </div>
              </Row>
              <Row>
                <div className = "movie-director">
                  <span className = "label">Director: </span>
                  <span className = "value">{movie.Director.Name}</span>
                </div>
              </Row>
            </Col>
          </Row>

          <Row>
            <Button onClick={() => goBack()} className="back-button">Back</Button>
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