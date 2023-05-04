import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UserPage.module.css';

function UserPage() {
  const [userProfile, setUserProfile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/user')
      .then((response) => response.json())
      .then((data) => setUserProfile(data));
  }, []);

  const handleDeleteAccount = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleConfirmDelete = () => {
    fetch('http://localhost:8080/user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.ok) {
        sessionStorage.clear();
        navigate('/');
      } else {
        throw new Error('Failed to delete user');
      }
    })
    .catch((error) => {
      console.error(error);
    });
    setShowPopup(false);
  };
  

  const handleEdit = () => {
    navigate("/edit");
  }

  const handleLocations = () => {
    navigate("/locations");
  }

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  }

  const handleViewAppointments = () => {
    navigate('/appointments');
  }

  return (
    <div className={styles['user-page-container']}>
      {showPopup && (
        <div className={styles['popup-background']} onClick={handlePopupClose}>
          <div className={styles['popup-container']} onClick={(e) => e.stopPropagation()}>
            <h2>Are you sure?</h2>
            <div className={styles['popup-buttons']}>
              <button className={styles['popup-yes-btn']} onClick={handleConfirmDelete}>
                Yes
              </button>
              <button className={styles['popup-no-btn']} onClick={handlePopupClose}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {userProfile && (
        <div className={styles['user-profile']}>
        <div className={styles['logout-button-container']}>
          <button className={styles['logout-button']} onClick={handleLogout}>
            Log Out
          </button>
        </div>
        <img
            className={styles['user-profile-picture']}
            src={userProfile.profilePicture}
            alt={`${userProfile.name}'s profile`}
          />
          <h2 className={styles['user-name']}>{userProfile.name}</h2>
          <div className={styles['user-details']}>
            <p>
              <strong>Location:</strong> {userProfile.location}
            </p>
            <p>
              <strong>Blood Group:</strong> {userProfile.grupaSange}
            </p>
          </div>
        </div>
      )}

      <div className={styles['user-actions']}>
        <button className={styles['user-action-btn']} onClick={handleEdit}>
          Edit Account 
          </button>
        <button className={styles['user-action-btn']} onClick={handleLocations}>
          View Locations
          </button>
        <button className={styles['user-action-btn']} onClick={handleDeleteAccount}>
          Delete Account
        </button>
        <button className={styles['user-action-btn']} onClick={handleViewAppointments}>
          View Past Donations
          </button>
      </div>
    </div>
  );
}

export default UserPage;
