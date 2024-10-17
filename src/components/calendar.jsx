/* eslint-disable react/prop-types */
import { Typography, Container } from "@mui/material";
import CalendarComponent from "./calendarComponent";
import { Helmet } from "react-helmet-async";
import "../App.css";

function CalendarPage({ onDateChange, selectedDate }) {
  return (
    <div>
      <Helmet>
        <title>Calendrier - Sélectionnez une date</title>
        <meta
          name="description"
          content="Sélectionnez une date dans le calendrier pour gérer vos tâches."
        />
      </Helmet>
      <Container className="container">
        <Typography variant="h5" color="black" align="center" gutterBottom>
          Sélectionnez une date
        </Typography>
        <CalendarComponent onDateChange={onDateChange} selectedDate={selectedDate} />
      </Container>
    </div>
  );
}

export default CalendarPage;
