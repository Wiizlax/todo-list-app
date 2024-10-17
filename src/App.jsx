import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Suspense, lazy, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';

// Lazy load des pages
const TodoPage = lazy(() => import('./components/todoPage'));
const CalendarPage = lazy(() => import('./components/calendar'));

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());

  const handleDateChange = (date) => {
    setSelectedDate(date.toLocaleDateString()); 
  };

  return (
    <HelmetProvider>
      <Router>
        <AppBar>
          <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Button color="inherit" component={Link} to="/">Aujourd&apos;hui</Button>
              <Button color="inherit" component={Link} to="/calendrier">Calendrier</Button>
            </div>
          </Toolbar>
        </AppBar>

        {/* Suspense pour attendre le chargement des composants */}
        <Suspense fallback={
          <div style={{
            display: 'flex',
            height: '100vh',
            fontSize: '24px'
          }}>
            Chargement...
          </div>
        }>
          <Routes>
            <Route path="/" element={<TodoPage selectedDate={selectedDate} />} />
            <Route path="/calendrier" element={<CalendarPage onDateChange={handleDateChange} selectedDate={selectedDate}/>} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;
