import { useEffect, useState } from 'react';
import './App.css';
import Mounts from './components/Mounts';
import Minions from './components/Minions'; 

function App() {
  return (
    <div className="App">
      {/* <Mounts /> */}
      <Minions />
    </div>
  );
}

export default App;
