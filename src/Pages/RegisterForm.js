import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css';

function RegisterForm() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          password,
          location,
          grupaSange: bloodGroup,
          profilePicture,
          email,
          phoneNumber,
        }),
      });
      const data = await response.json();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className={styles['register-form-container']}>
      <form className={styles['register-form']}>
        <label htmlFor="name">Name:</label>
        <input
          className={styles['register-input']}
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="username">Username:</label>
        <input
          className={styles['register-input']}
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          className={styles['register-input']}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="location">Location:</label>
        <input
          className={styles['register-input']}
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="profilePicture">Profile Picture Link:</label>
        <input
          className={styles['register-input']}
          type="text"
          id="profilePicture"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />

        <label htmlFor="email">Email address:</label>
        <input
          className={styles['register-input']}
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="phoneNumber">Phone number:</label>
        <input
          className={styles['register-input']}
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <label htmlFor="bloodGroup">Blood Group:</label>
        <select
          className={styles['register-input']}
          id="bloodGroup"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        >
          <option value="">-</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        
        <div className={styles['button-container']}>
        <button className={styles['login-button']} onClick={handleSubmit}>
          Register
        </button>
        <button className={styles['login-button']} onClick={handleBackClick}>
          Back
        </button>
        </div>

      </form>
      <div className={styles['button-container']}>
        
      </div>
    </div>
  );
}

export default RegisterForm;
