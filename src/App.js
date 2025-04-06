import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Game from './pages/Game';
import Chat from './pages/Chat';
import Resources from './pages/Resources';
import EmergencyMode from './components/EmergencyMode';
import PeerSupportChat from './components/PeerSupportChat';

// Initialize Firebase
import './firebase';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/sos" element={<EmergencyMode />} />
          <Route path="/peer-support" element={<PeerSupportChat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
