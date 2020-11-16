import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication the call props.onLoggedIn(username)*/
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
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form> */

    <Form>
      <Container>
        <Form.Label>
          <h1>Log-In to myFlix</h1>
        </Form.Label>
      </Container>
      <Container>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value = {username} onChange={e => setUsername(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value = {password} onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <Col>
          <Button className="login-button" block type="submit" onClick={handleSubmit}>Submititi</Button>
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