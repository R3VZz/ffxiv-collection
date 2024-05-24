import './App.css';
import Home from './components/Home';
import Achievements from './components/Achievements';
import Mounts from './components/Mounts';
import Minions from './components/Minions';
import Orchestrions from './components/Orchestrions';
import Spells from './components/Spells';
import { Route, BrowserRouter as Router, Link, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <h1>Final Fantasy XIV - Collection</h1>

        <nav>
          <ul>
            <li><Link to="/Home">Home</Link></li>
            <li><Link to="/Achievements">Achievements</Link></li>
            <li><Link to="/Mounts">Mounts</Link></li>
            <li><Link to="/Minions">Minions</Link></li>
            <li><Link to="/Orchestrions">Orchestrions</Link></li>
            <li><Link to="/Spells">Spells</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Home title="Home"/>} />
          <Route path="/Achievements" element={<Achievements title="Achievements"/>} />
          <Route path="/Mounts" element={<Mounts title="Mounts"/>} />
          <Route path="/Minions" element={<Minions title="Minions"/>} />
          <Route path="/Orchestrions" element={<Orchestrions title="Orchestrions"/>} />
          <Route path="/Spells" element={<Spells title="Spells"/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
