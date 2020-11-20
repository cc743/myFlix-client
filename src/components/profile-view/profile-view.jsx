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
     username: '',
     email: '',
     favoriteMovies: [],
     password: '',
     __v: '',
     _id: ''
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.setState({
        username: user.username,
        email: user.email,
        favoriteMovies: user.favoriteMovie,
        password: user.password,
      });
    }
  }

  handleUpdate = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    axios.put(`https://the-greatest.herokuapp.com/users/${this.state.username}`, {
      headers: {Authorization: `Bearer ${token}`}, 
      data: {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      },
    })
      .then(response => {
        alert('Saved Changes');
        console.log(response);
        
        localStorage.setItem('user', this.state);
      })
      .catch(function (error){
        console.log(error);
      });

  }

  updateFormValue = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  render() {
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
            <Form.Label className="label">Update Your Email: </Form.Label>
            <Form.Control type="text" value={this.state.email} onChange={(e) => this.updateFormValue('email', e.target.value)} />
          </Form.Group>
          <Row>
            <Button className="update button" onClick={this.handleUpdate}>Update Now!</Button>
          </Row>
          <Row>
          <Button className="unregister-button">Unregister</Button>
          </Row>
        </Container>

        <Container>
          <h2 className="fav-movies">My Favorite Movies</h2>
          <ul>
            {this.state.favoriteMovies.map(movie => {
              return <li key={movie}>{movie}</li>
            })}
          </ul>
        </Container>
      </div>
    );
  }
}
