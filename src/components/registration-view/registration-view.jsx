import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
    <form>
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
    </form>
  );

}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }),
};