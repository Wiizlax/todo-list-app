/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

const convertToDate = (dateString) => {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
};

const CalendarComponent = ({ onDateChange, selectedDate }) => {
  const initialDate = isValidDate(convertToDate(selectedDate)) ? convertToDate(selectedDate) : new Date();

  const [date, setDate] = useState(initialDate);
  const [activeStartDate, setActiveStartDate] = useState(initialDate);

  useEffect(() => {
    const newDate = convertToDate(selectedDate);
    if (isValidDate(newDate)) {
      setDate(newDate);
      setActiveStartDate(newDate);
    } else {
      console.error('Invalid selectedDate:', selectedDate);
    }
  }, [selectedDate]);

  const resetToToday = () => {
    const today = new Date();
    setDate(today);
    setActiveStartDate(today);
    onDateChange(today);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);  // Met à jour la date dans l'état global
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Sélectionnez une date</h2>
      <button 
        onClick={resetToToday} 
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}
      >
        Revenir à aujourd&apos;hui
      </button>
      <Calendar
        onChange={handleDateChange}
        value={date}
        activeStartDate={activeStartDate} 
        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
        style={{ border: '1px solid #ccc', borderRadius: '5px' }}
      />
      <p style={{ marginTop: '20px' }}>Date sélectionnée : {date.toDateString()}</p>
    </div>
  );
};

export default CalendarComponent;