import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import VaillantHeatPumpVisualizer from './visu';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <VaillantHeatPumpVisualizer />
  </React.StrictMode>
);