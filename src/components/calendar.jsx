import { Typography, Container } from "@mui/material";
import CalendarComponent from "./calendarComponent";
import { Helmet } from "react-helmet-async";
import "../App.css";

function CalendarPage() {
  return (
    <div>
      <Helmet>
        <title>Calendrier - Sélectionnez une date</title>
        <meta
          name="description"
          content="Utilisez notre calendrier pour sélectionner une date et gérer vos événements."
        />
      </Helmet>

      <Container maxWidth="sm" className="container">
        <Typography variant="h4" color="black" align="center" gutterBottom>
          Calendrier
        </Typography>
        <CalendarComponent />
      </Container>
    </div>
  );
}

export default CalendarPage;
