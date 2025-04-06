import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import app from './firebase';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Chat from './pages/Chat';
import Game from './pages/Game';
import Resources from './pages/Resources';
import SOS from './pages/SOS';

function App() {
  const [firebaseInitError, setFirebaseInitError] = useState(false);

  useEffect(() => {
    // Check if Firebase is initialized correctly
    if (!app) {
      setFirebaseInitError(true);
      console.error("Firebase initialization failed");
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {firebaseInitError && (
          <div style={{
            padding: '10px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            textAlign: 'center',
            width: '100%',
            position: 'fixed',
            top: 0,
            zIndex: 9999
          }}>
            Warning: Some features may not be available due to connection issues. Try refreshing the page.
          </div>
        )}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/game" element={<Game />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/sos" element={<SOS />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
