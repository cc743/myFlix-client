import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card'; //two periods??
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();

    //Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: null,
      selectedMovie: null
    };
  }

  //one of the "hooks" available to in a React component
  componentDidMount() {
    axios.get('https://the-greatest.herokuapp.com/movies') //<-- please set this to your Heroku endpoint
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

  //This overrides the render() method of the superclass. 
  render() {
    const { movies, selectedMovie } = this.state;

    if (!movies) return <div className = "main-view"/>;

    return (
      <div className = "main-view">
        { selectedMovie
          ? <MovieView movie = {selectedMovie}  goBack = {this.clearSelectedMovie}/>
          : movies.map(movie => (
            <MovieCard key = {movie._id} movie = {movie} handleClick = {movie => this.onMovieClick(movie)}/>
        ))}
      </div>
    );
  }
}