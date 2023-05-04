import React, { useState, useEffect } from 'react';
import styles from './DoctorEdit.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

export function DoctorEdit() {
    
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    location: '',
    profilePictureUrl: '',
    email: '',
    cnp: '',
  });

  useEffect(() => {
    fetch(`http://localhost:8080/getDoctor/${id}`)
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
      const response = await fetch(`http://localhost:8080/updateDoctor`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      navigate("/doctors");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles['edit-doctor-container']}>
      <h1>Edit Doctor</h1>
      <form className={`${styles['edit-doctor-form']} return-table`} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name || ''} onChange={handleInputChange} />
  
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={formData.username || ''} onChange={handleInputChange} />
  
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" name="password" value={formData.password || ''} onChange={handleInputChange} />
  
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" value={formData.location || ''} onChange={handleInputChange} />
  
        <label htmlFor="profilePictureUrl">Profile Picture Url:</label>
        <input type="text" id="profilePictureUrl" name="profilePictureUrl" value={formData.profilePictureUrl || ''} onChange={handleInputChange} />
  
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email || ''} onChange={handleInputChange} />
  
        <label htmlFor="cnp">CNP:</label>
        <input type="text" id="cnp" name="cnp" value={formData.cnp || ''} onChange={handleInputChange} />
  
        <button className={styles['register-button']} type="submit">Save Changes</button>
      </form>
    </div>
  );
  
}

export default DoctorEdit;
