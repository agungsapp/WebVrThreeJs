import React from 'react';
import './App.css';
import VRScene from './components/VRScene';

const App = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <VRScene />
    </div>
  );
};

export default App;
