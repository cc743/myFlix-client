import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card'; 
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss'

export class MainView extends React.Component {
  constructor() {
    super();

  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (accessToken !== null) {
      this.props.setUser(user);
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user.username);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://the-greatest.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.props.setUser('');
    location.reload()
  }

  //This overrides the render() method of the superclass. 
  render() {
    let { movies, user } = this.props;

    if (!movies) return <div className = "main-view"/>;

    return (

      <Router>
        <div className = "main-view">
          <Row>
            <Link to="/profile" className="username-button">
              <Button>{user}</Button>
            </Link>
          </Row>
          <Row>
            <Link to="/" className="username-button">
              <Button onClick={() => this.onLoggedOut()}>Log Out</Button>
            </Link>
          </Row>
          <Route exact path = "/" render = {() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
            return <MoviesList movies={movies}/>
          }}/>
          <Route path="/register" render = {() => <RegistrationView />} />
          <Route path="/profile" render = {() => <ProfileView movies={movies}/>} />
          <Route path = "/movies/:movieId" render = {( {match} ) => <MovieView movie = {movies.find(m => m._id === match.params.movieId )}/> }/>  
          <Route path = "/Genres/:name" render = {( {match} ) => <GenreView movie = {movies.find(m => m.Genre.Name === match.params.name)} />}/>
          <Route path = "/Directors/:name" render = {( {match} ) => <DirectorView movie = {movies.find(m => m.Director.Name === match.params.name)} />}/> 
          
        </div>

      </Router>

      );

  }
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);

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
