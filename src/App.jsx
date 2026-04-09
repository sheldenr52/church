import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Contact from './pages/Contact';
import EventUpdates from './pages/EventUpdates';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/eventupdates" element={<EventUpdates />} />
      </Routes>
    </Router>
  );
}

export default App;
