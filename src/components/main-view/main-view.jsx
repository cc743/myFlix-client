import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card'; 
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss'

export class MainView extends React.Component {
  constructor() {
    super();

    //Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      newUser: null
    };
  }

  //one of the "hooks" available to in a React component
  componentDidMount() {
    axios.get('https://the-greatest.herokuapp.com/movies') //<-- please set this to your Heroku '/movies' endpoint
      .then(response => {
        //assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  clearSelectedMovie = () => {
    this.setState({
      selectedMovie: null
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onNewUser() {
    console.log('set new user');
    this.setState({
      newUser: true
    });
  }

  //This overrides the render() method of the superclass. 
  render() {
    const { movies, selectedMovie, user, newUser } = this.state;

    if (!user && !newUser ) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;

    if (!user && newUser ) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)}/>

    if (!movies) return <div className = "main-view"/>;

    return (
      /* <div className = "main-view">
        { selectedMovie
          ? <MovieView movie = {selectedMovie}  goBack = {this.clearSelectedMovie}/>
          : movies.map(movie => (
            <MovieCard key = {movie._id} movie = {movie} handleClick = {movie => this.onMovieClick(movie)}/>
        ))}
      </div> */
      
      <div className = "main-view">
        <Container>
        { selectedMovie
          ? <MovieView movie = {selectedMovie}  goBack = {this.clearSelectedMovie}/>
          : movies.map(movie => (
            <MovieCard key = {movie._id} movie = {movie} handleClick = {movie => this.onMovieClick(movie)}/>
        ))}
        </Container>
      </div>

    );
  }
}

MainView.propTypes = {
  movie: PropTypes.arrayOf({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool
  }),
  user: PropTypes.string
};