import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import { Link } from "react-router-dom";

import './profile-view.scss'

export class ProfileView extends React.Component {

  constructor(props) {
    super();
    
    this.username = undefined;
    this.password = undefined;
    this.email = undefined;

    this.state = {
      user: null,
      username: "",
      password: "",
      email: "",
      favoriteMovie: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem("user");

    axios.get(`https://the-greatest.herokuapp.com/users/${username}`, {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((response) => {
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

  handleUpdate = (e) => {
    
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.put(`https://the-greatest.herokuapp.com/users/${username}`, {
      username: this.username,
      password: this.password,
      email: this.email,
    },
    {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((response) => {
      const data = response.data;
      localStorage.setItem("user", data.username);
      window.open("/users", "_self");
      alert("Updated Successfully");
    })
    .catch((e) => {
      console.log(e);
    });

  };

  handleDeregistration = (e) => {

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.delete(`https://the-greatest.herokuapp.com/users/${username}`, {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((response) => {
      const data = response.data;
      window.open("/", "_self");
    })
    .catch((e) => {
      alert("error deregistering user");
    });

    this.setState({
      user: null
    });
    localStorage.removeItem("user");
    localStorage.removeItem("token");

  };

  removeItem(movie) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.delete(`https://the-greatest.herokuapp.com/users/${username}/movies/${movie}`, {
      headers: {Authorization: `Bearer ${token}`}, 

      favoriteMovie: this.favoriteMovie
    })
    .then((response) => {
      this.setState({
        favoriteMovie: response.data.favoriteMovie
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    alert("Movie successfully removed");
  }

  setUsername(input) {
    this.username = input;
  }

  setPassword(input) {
    this.password = input;
  }

  setEmail(input) {
    this.email = input;
  }

  render() {
    const movies = this.props.movies;

    const username = this.state.username,
      email = this.state.email,
      favoriteMovie = this.state.favoriteMovie;

    console.log(favoriteMovie)

    return (
      <div className="profile-view">
        <Container className="profile-view-container">
          <CardGroup>
            <Card className="profile-card">
              <Card.Header as="h5">Profile</Card.Header>
              <Card.Body>
                <Card.Text className="text-card">Username: {username}</Card.Text>
                <Card.Text className="text-card">Email: {email}</Card.Text>
                <Button className="remove-button" onClick={() => this.handleDeregistration()}>Deregister</Button>
              </Card.Body>
            </Card>

            <Card className="edit-profile-card">
              <Card.Header as="h5">Edit Profile</Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label className="username-label">Username</Form.Label>
                  <Form.Control type="text" placeholder="enter username" name="username" value={this.username} onChange={(e) => this.setUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="password-label">Password</Form.Label>
                  <Form.Control type="password" placeholder="enter password" name="password" value={this.password} onChange={(e) => this.setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="email-label">E-mail</Form.Label>
                  <Form.Control type="email" placeholder="enter email" name="email" value={this.email} onChange={(e) => this.setEmail(e.target.value)}/>
                </Form.Group>
                <Button className="back-button" onClick={() => this.handleUpdate()}>Update Now!</Button>
              </Card.Body>
            </Card>

          {/* Enter stuff about fav movies below */}
            <Card className="favorites-card">
              <Card.Header as="h5">My Favorite Movies</Card.Header>
              <Card.Body>
                {favoriteMovie.length === 0 && <div>No favorites</div>}
                <div>
                  <ul>
                    {favoriteMovie.length > 0 && movies.map((movie) => {
                        if (movie._id === favoriteMovie.find((favMovie) => favMovie === movie._id))
                        {return (
                        <li className="favorite-items" key={movie._id}>
                          <Link to = {`/movies/${movie._id}`}>
                            {movie.Title}
                          </Link>
                          <Button className="remove-button" onClick={() => this.removeItem(movie._id)}>Remove from Favorites</Button>
                        </li>
                      );
                    }
                  })}
                  </ul>
                </div> 
                </Card.Body> 
              </Card>

          </CardGroup>
          <Row>
            <Link to = {`/`}>
              <Button className="back-button" variant="link">Go Back</Button>
            </Link>
          </Row>
        </Container>
      </div>
    );

  }

}
//11-21 2:26pm progress made!
//11-22 5:45pm further progress made!  Able to complete profile view after watching 1 youtube video.
