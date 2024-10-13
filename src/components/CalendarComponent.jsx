import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  // Fonction pour remettre la date à aujourd'hui et mettre à jour la vue
  const resetToToday = () => {
    const today = new Date();
    setDate(today);
    setActiveStartDate(today);
    console.log('Date remise à aujourd\'hui:', today);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    console.log('Date sélectionnée:', newDate);
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
