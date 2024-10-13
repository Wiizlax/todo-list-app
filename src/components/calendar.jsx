import { Typography, Container } from '@mui/material';
import CalendarComponent from './calendarComponent';
import "../App.css";

function CalendarPage() {
  return (
    <Container maxWidth="sm" className='container'>
      <Typography variant="h4" color="black" align="center" gutterBottom>
        Calendrier
      </Typography>
      <CalendarComponent />
    </Container>
  );
}

export default CalendarPage;