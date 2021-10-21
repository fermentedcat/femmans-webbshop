import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/authContext'
import { UiProvider } from './context/uiContext'
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <UiProvider>
          <App />
        </UiProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

