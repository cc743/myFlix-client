import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route } from "react-router-dom";

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
      movies: [],
      //selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /* onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  clearSelectedMovie = () => {
    this.setState({
      selectedMovie: null
    });
  } */

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://the-greatest.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
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

  //This overrides the render() method of the superclass. 
  render() {
    const { movies, user } = this.state;

    if (!movies) return <div className = "main-view"/>;

    return (

      <Router>
        <div className = "main-view">
          <Route exact path = "/" render = {() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
            return movies.map(m => <MovieCard key = {m._id} movie = {m} />)} 
          }/>
          <Route path="/register" render = {() => <RegistrationView />} />
          <Route path = "/movies/:movieId" render = {( {match} ) => <MovieView movie = {movies.find(m => m._id === match.params.movieId )}/> }/>  
        </div>
      </Router>

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

/* <div className = "main-view">
        { selectedMovie
          ? <MovieView movie = {selectedMovie}  goBack = {this.clearSelectedMovie}/>
          : movies.map(movie => (
            <MovieCard key = {movie._id} movie = {movie} handleClick = {movie => this.onMovieClick(movie)}/>
        ))}
      </div> */