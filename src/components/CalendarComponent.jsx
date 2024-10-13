// src/components/CalendarComponent.js
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    console.log('Date sélectionnée:', newDate);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <h2>Sélectionnez une date</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        style={{ border: '1px solid #ccc', borderRadius: '5px' }}
      />
      <p style={{ marginTop: '20px' }}>Date sélectionnée : {date.toDateString()}</p>
    </div>
  );
};

export default CalendarComponent;
