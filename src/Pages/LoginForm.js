import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          { username, password }
        )
      });
      const data = await response.json();
      if (data.role === 1) {
        navigate('/admin');
      } else if (data.role === 2) {
        navigate('/doctor');
      } else if (data.role === 3) {
        navigate('/user');
      } else {
        console.error('Invalid role');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  }

  return (
    <div className={styles['login-form-container']}>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles['login-input']} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles['login-input']} />
        <div className={styles['button-container']}>
          <button className={styles['login-button']} onClick={handleRegisterClick}>Register</button>
          <button type="submit" className={styles['login-button']}>Log In</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
