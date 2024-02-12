import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const history = useHistory();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error('Login failed');
        }
        return r.json();
      })
      .then((user) => {
        onLogin(user);
        // after logging the user in, redirect to the home page!
        history.push('/home');
      })
      .catch((error) => {
        console.error('Login error:', error);
        // Handle login error, show a message to the user, etc.
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;

