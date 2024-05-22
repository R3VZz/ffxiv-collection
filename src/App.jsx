import './App.css';
import Home from './components/Home';
import Achievements from './components/Achievements';
import Mounts from './components/Mounts';
import Minions from './components/Minions';
import { Route, BrowserRouter as Router, Link, Routes } from 'react-router-dom';

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
          </ul>
        </nav>

        <Routes>
          <Route path="/Home" element={<Home title="Home"/>} />
          <Route path="/Achievements" element={<Achievements title="Achievements"/>} />
          <Route path="/Mounts" element={<Mounts title="Mounts"/>} />
          <Route path="/Minions" element={<Minions title="Minions"/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
