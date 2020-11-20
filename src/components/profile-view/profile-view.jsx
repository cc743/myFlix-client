import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

import './profile-view.scss'

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      favoriteMovie: [],
      movies: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);  //note: getUser is a method we create below
    }
  }

  getUser(token) {
    let activeUser = localStorage.getItem('user');
    axios.get(`https://the-greatest.herokuapp.com/users/${activeUser}`, {
      headers: {Authorization: `Bearer ${token}`}, 
    })
    .then(response => {
      this.setState({
        username: response.data.username,
        password: response.data.password,
        email: response.data.email, 
        favoriteMovie: response.data.favoriteMovie
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // handleUpdate(e, newUsername, newEmail) {
  //   this.setState({
  //     validated: null
  //   });

  //   const form = e.currentTarget;
  //   if (form.checkValidity() === false) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     this.setState({
  //       validated: true
  //     });
  //     return;
  //   }
  //   e.preventDefault();

  //   const token = localStorage.getItem('token');

  //   axios.put(`https://the-greatest.herokuapp.com/users/${activeUser}`, {
  //     headers: {Authorization: `Bearer ${token}`}, 
  //     data: {
  //       username: newUsername ? newUsername: this.state.username,
  //       password: this.password,
  //       email: newEmail ? newEmail: this.state.email
  //     },
  //   })
  //     .then(response => {
  //       alert('Saved Changes');
  //       this.setState({
  //         username: response.data.username,
  //         password: response.data.password,
  //         email: response.data.email
  //       });
  //       localStorage.setItem('user', this.state.username);
  //       window.open(`/users/${username}`, '_self');
  //     })
  //     .catch(function (error){
  //       console.log(error);
  //     });

  // }

  render() {
    const{movies} = this.props;
    const userFavoriteMovies = this.state.favoriteMovie || [];
    console.log(userFavoriteMovies);
    console.log(userFavoriteMovies.length);
    // const favoriteMoviesList = movies.filter((movie) => userFavoriteMovies.includes(movie._id));  //encountering an issue where browser renders empty arrays before rendering the actual array, therefore giving me an error with 'filter' method
    

    return (
      <div className = "profile-view">
        <Container>
          <Form>
            <Form.Label className="label">
              <h2>Update Your Information</h2>
            </Form.Label>
          </Form>
        </Container>
        <Container>
          <Form.Group>
            <Form.Label className="label">Update Your Username: </Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Group>
            <Form.Label className="label">Update Your Email: </Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Row>
            <Button className="update button">Update Now!</Button>
          </Row>
          <Row>
          <Button className="unregister-button">Unregister</Button>
          </Row>
        </Container>

        <Container>
          <h2 className="fav-movies">My Favorite Movies</h2>
          {/* {favoriteMoviesList.map((movie) => {
            return (
              <Card key={movie._id}>
                <Card.Img variant="top" src={movie.ImagePath}/>
                  <Card.Body>
                    <Link to={`/movies/${movie._id}`}>
                      <Button variant="link">Movie Information</Button>
                    </Link>
                  </Card.Body>
              </Card>
            )
          })} */}
        </Container>
      </div>
    );
  }

}

ProfileView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    favoriteMovie: PropTypes.array
  })
}