import React, { useState, useEffect } from 'react';
import styles from './AdminPage.module.css';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [email, setEmail] = useState('');
  const [cnp, setCNP] = useState('');
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/addDoctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          password,
          location,
          profilePicture,
          email,
          cnp,
        }),
      });
      const data = await response.json();
      console.log('Doctor registered successfully!');
      setName('');
      setUsername('');
      setPassword('');
      setLocation('');
      setProfilePicture('');
      setEmail('');
      setCNP('');
      setDoctors((prevDoctors) => [...prevDoctors, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (doctorId) => {
    try {
      const response = await fetch(`http://localhost:8080/deleteDoctor/${doctorId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data.message);
      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.id !== doctorId)
      );
    } catch (error) {
      console.error(error);
    }
  };  

  const handleEdit = async (doctorId) => {
    navigate(`/doctorEdit/${doctorId}`);
  };
  
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:8080/getDoctors');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className={styles['admin-page-container']}>
      <div className={styles['admin-page-left']}>
        <form className={styles['admin-form']} onSubmit={handleRegister}>
          <label htmlFor="name">Name:</label>
          <input
            className={styles['admin-input']}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="username">Username:</label>
          <input
            className={styles['admin-input']}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            className={styles['admin-input']}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="location">Location:</label>
          <input
            className={styles['admin-input']}
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label htmlFor="profile-picture">Profile Picture URL:</label>
          <input
            className={styles['admin-input']}
            type="text"
            id="profile-picture"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
          <label htmlFor="email">Email:</label>
          <input
            className={styles['admin-input']}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="cnp">CNP:</label>
          <input
            className={styles['admin-input']}
            type="text"
            id="cnp"
            value={cnp}
            onChange={(e) => setCNP(e.target.value)}
          />
          <button className={styles['admin-button']} type="submit">
            Register
          </button>
        </form>
      </div>
      <div className={styles['admin-page-right']}>
        <h2 className={styles['admin-heading']}>Doctors List</h2>
        <table className={styles['admin-table']}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>CNP</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.name}</td>
                <td>{doctor.username}</td>
                <td>{doctor.location}</td>
                <td>{doctor.email}</td>
                <td>{doctor.cnp}</td>
                <td>
                  <button
                    className={styles['edit-button']}
                    onClick={() => handleEdit(doctor.id)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles['edit-button']}
                    onClick={() => handleDelete(doctor.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
);
}

export default AdminPage;    