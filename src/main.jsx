import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Remove strict mode for production to avoid double rendering
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
