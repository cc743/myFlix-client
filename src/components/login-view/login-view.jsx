import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './login-view.scss'

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(username, password);
    /* Send a request to the server for authentication the call props.onLoggedIn(username)*/
    axios.post('https://the-greatest.herokuapp.com/login', {
      username: username,
      password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data); 
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  const handleRegistrant = (e) => {
    e.preventDefault();

  }

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
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form> */
    
    <Form className="overall-form">
      <Container className="header">
        <Form.Label className="label">
          <h1>Log-In to myFlix</h1>
        </Form.Label>
      </Container>
      <Container className="login-form">
        <Form.Group controlId="formUsername">
          <Form.Label className="label">Username</Form.Label>
          <Form.Control type="text" value = {username} onChange={e => setUsername(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label className="label">Password</Form.Label>
          <Form.Control type="password" value = {password} onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <Col>
          <Button className="login-button" block type="submit" onClick={handleSubmit}>Submititi</Button>
          <Button className="login-button" block type="submit" onClick={handleRegistrant}>Register</Button>
        </Col>
      </Container>
    </Form>

  );
  
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};