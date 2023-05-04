import React, { useState, useEffect } from 'react';
import styles from './EditUser.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    grupaSange: '',
    email: '',
    phoneNumber: '',
    profilePicture: '',
  });

  useEffect(() => {
    fetch(`http://localhost:8080/edit`)
      .then(response => response.json())
      .then(data => {
        setFormData(data);
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      navigate("/user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles['edit-user-container']}>
      <h1>Edit User</h1>
      <form className={styles['edit-user-form']} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name || ''} onChange={handleInputChange} className={styles['register-input']} />

        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" value={formData.location || ''} onChange={handleInputChange} className={styles['register-input']} />

        <label htmlFor="grupaSange">Blood Group:</label>
        <input type="text" id="grupaSange" name="grupaSange" value={formData.grupaSange || ''} onChange={handleInputChange} className={styles['register-input']} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email || ''} onChange={handleInputChange} className={styles['register-input']} />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber || ''} onChange={handleInputChange} className={styles['register-input']} />

        <label htmlFor="profilePicture">Profile Picture:</label>
        <input type="text" id="profilePicture" name="profilePicture" value={formData.profilePicture || ''} onChange={handleInputChange} className={styles['register-input']} />

        <button className={styles['register-button']} type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditUser;
