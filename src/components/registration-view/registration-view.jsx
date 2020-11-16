import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import './registration-view.scss'

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email);
    props.onLoggedIn(username);
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
      <Form.Label>
        <h1>Register to myFlix!</h1>
      </Form.Label>
      <Form.Group controlID="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>E-mail</Form.Label>
        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)}/>
      </Form.Group>
      <Button className="login-button" block type="submit" onClick={handleSubmit}>Register Now!</Button>
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