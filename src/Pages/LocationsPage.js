import React, { useState, useEffect } from 'react';
import styles from './LocationsPage.module.css';
import { Link, useNavigate } from 'react-router-dom';

function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [showPopup, setShowPopup] = useState(false); 
  const [selectedLocation, setSelectedLocation] = useState(null); 
  const [selectedDate, setSelectedDate] = useState(null); 
  const [selectedHour, setSelectedHour] = useState(null); 
  const [bookedHours, setBookedHours] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/locations')
      .then((response) => response.json())
      .then((data) => setLocations(data));
  }, []);

  const handleGoBack = () => {
    navigate('/user');
  };

  const handleDonateClick = (location) => {
    setSelectedLocation(location);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedLocation(null);
    setSelectedDate(null);
    setSelectedHour(null);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const handleCreateAppointmentClick = () => {
    const newAppointment = {
      idLocatie: selectedLocation.id,
      ora: selectedHour,
      data: selectedDate
    };
    
    fetch('http://localhost:8080/programare', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAppointment)
    })
    .then((response) => {
      if (response.ok) {
        console.log('Appointment created successfully!');
        fetchBookedHours();
      } else {
        console.error('Failed to create appointment.');
      }
      handlePopupClose();
    })
    .catch((error) => {
      console.error('Error occurred while creating appointment:', error);
      handlePopupClose();
    });
  };

  useEffect(() => {
    fetchBookedHours();
  }, [selectedLocation, selectedDate]);
  
  const fetchBookedHours = () => {
    /*fetch(`http://localhost:8080/programari?data=${selectedDate}&idLocatie=${selectedLocation.id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch appointments.');
          return [];
        }
      })
      .then((appointments) => {
        const bookedHours = appointments.map((appointment) => parseInt(appointment.ora));
        setBookedHours(bookedHours);
      })
      .catch((error) => {
        console.error('Error occurred while fetching appointments:', error);
      });*/
  };
  
  

  const renderHours = () => {
    const openingHour = parseInt(selectedLocation.openingHour);
    const closingHour = parseInt(selectedLocation.closingHour);
    const availableHours = getAvailableHours(openingHour, closingHour).filter((hour) => !bookedHours.includes(hour));
  
    const hourOptions = [
      <option key="-" value="-">-</option>,
      ...availableHours.map((hour) => (
        <option key={hour} value={hour}>
          {hour}:00
        </option>
      ))
    ];
  
    return hourOptions;
  };  
  

  const getAvailableHours = (openingHour, closingHour) => {
    const availableHours = [];
    for (let i = openingHour; i <= closingHour; i++) {
      availableHours.push(i);
    }
    return availableHours;
  };

  return (
    <div className={styles['locations-page-container']}>
      <button className={styles['go-back-button']} onClick={handleGoBack}>Go back</button>
      <h1 className={styles['locations-header']}>Locations</h1>
      <div className={styles['locations-list']}>
        {locations.map((location) => (
          <div key={location.id} className={styles['location-card']}>
            <h2 className={styles['location-name']}>{location.name}</h2>
            <img className={styles['location-photo']} src={location.photo} alt={location.name} />
            <div className={styles['location-info']}>
              <p className={styles['location-adress']}>{location.adress}, {location.judet}</p>
              <p className={styles['location-hours']}>
                Opening Hours: {location.openingHour} - {location.closingHour}
              </p>
              <button className={styles['donate-button']} onClick={() => handleDonateClick(location)}>Donate now</button>
            </div>
          </div>
        ))}
      </div>
      {showPopup && (
        <div className={styles['popup-container']}>
          <div className={styles['popup-overlay']} onClick={handlePopupClose}></div>
          <div className={styles['popup']}>
            <h2 className={styles['popup-title']}>Thank you for donating to {selectedLocation.name}!</h2>
            <label htmlFor="date-picker">Pick a date:</label>
            <input type="date" id="date-picker" name="date-picker" onChange={handleDateChange} required />
            <label htmlFor="hour-picker">Pick an hour:</label>
            <select id="hour-picker" name="hour-picker" onChange={handleHourChange} required>
              {renderHours()}
            </select>
            <div className={styles['popup-buttons']}>
              <button className={styles['create-appointment-button']} onClick={handleCreateAppointmentClick}>Create appointment</button>
              <button className={styles['cancel-button']} onClick={handlePopupClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default LocationsPage;