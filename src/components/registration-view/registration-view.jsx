import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './registration-view.scss'

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('https://the-greatest.herokuapp.com/users', {
      username: username,
      password: password,
      email: email
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self');  //_self is necessary for page to open in current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });
  };

  return (
    /* <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </label>
      <label>
        Email:
        <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
      </label>
      <button type="button" onClick={handleSubmit}>Register</button>
    </form> */

    <Form>
      <Container>
      <Form.Label className = "label">
        <h1>Register to myFlix!</h1>
      </Form.Label>
      </Container>
      <Container>
      <Form.Group controlID="formUsername">
        <Form.Label className = "label">Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label className = "label">Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label className = "label">E-mail</Form.Label>
        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)}/>
      </Form.Group>
      <Button className="login-button" block type="submit" onClick={handleRegister}>Register Now!</Button>
      </Container>
    </Form>

  );

}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }),
};